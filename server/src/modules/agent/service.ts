import DB from '../../db/db.ts'
import { resultCounts, resultChart1, resultChart2 } from './dto.ts'
import { Prisma } from '../../generated/prisma/client.ts'
import { decodeBase64ToBytes, guessExtensionFromMime } from '../../utils/base64.ts'
import { buildPublicBucketPath } from '../../utils/supabase-storage.ts'
import { getPublicObjectStorage } from '../../adapters/storage/index.ts'
import { getOptionalEnv } from '../../utils/env.ts'
import crypto from 'node:crypto'
//helado
// Mapeo de tipos de propiedad
const PROPERTY_TYPE_MAP: Record<string, string> = {
    'Casa': 'HOUSE',
    'Apartamento': 'APARTMENT',
    'Terreno': 'LAND',
    'Local Comercial': 'RETAIL SPACE',
}

const PROPERTY_TYPE_REVERSE_MAP: Record<string, string> = {
    'HOUSE': 'Casa',
    'APARTMENT': 'Apartamento',
    'LAND': 'Terreno',
    'RETAIL SPACE': 'Local Comercial',
}

// Mapeo de estados
const PROPERTY_STATE_MAP: Record<string, string> = {
    'Disponible': 'AVAILABLE',
    'No Disponible': 'NOT AVAILABLE',
    'Vendido': 'SOLD',
}

const PROPERTY_STATE_REVERSE_MAP: Record<string, string> = {
    'AVAILABLE': 'Disponible',
    'NOT AVAILABLE': 'No Disponible',
    'SOLD': 'Vendido',
}

export type CreatePropertyInput = {
    title: string
    type: string
    address: string
    zone: string
    price: number
    num_rooms: number
    num_bathrooms: number
    square_meters: number
    state: string
    description: string
    images: string[]
}
//termina helado
export type UpdatePropertyInput = Partial<CreatePropertyInput>

export async function getStatsFromDB(idUser: number) {
    const resultCounts = await DB.$queryRaw<resultCounts[]>`
    select
            (select count(*)
        from property p
        where p.id_agent = ${idUser})::int as total_properties,
            (select count(*)
        from invitation i
        inner join property p on i.id_property = p.id_property
        where p.id_agent = ${idUser} and
            i.status = 'PENDING')::int as pending_appointments,
            (select count(*)
        from property p
        where p.state = 'SOLD' and
            p.id_agent = ${idUser})::int as sold_properties`

    const resultChart1 = await DB.$queryRaw<resultChart1[]>`
    select case p.type
            when 'HOUSE' then 'Casa'
            when 'RETAIL SPACE' then 'Local Comercial'
            when 'LAND' then 'Terreno'
            when 'APARTMENT' then 'Apartamento'
            else 'UNKNOWN'
            end as type,
        count(r.id_record)::int as value
    from record r
    inner join property p on r.id_property = p.id_property
    where p.id_agent = ${idUser}
    group by p.type
    order by value desc
    limit  3`

    const resultChart2 = await DB.$queryRaw<resultChart2[]>`
    select p.zone as zone,
        count(p.id_property)::int as value
    from property p
    where p.id_agent = ${idUser}
    group by p.zone
    order by value desc
    limit  5`
    return { ...resultCounts[0], most_searched: resultChart1, most_offered_zones: resultChart2 }
}

export async function filterFromDB(idUser: number, title: string | undefined, type: string | undefined, price: number | undefined, num_rooms: number | undefined, square_meters: number | undefined, num_bathrooms: number | undefined, asc_price: boolean | undefined, asc_title: boolean | undefined) {

    let query: Prisma.Sql[] = [];
    query.push(Prisma.sql`select p.id_property,
       p.title,
       (select image.url_img from image inner join property on image.id_property = property.id_property where property.id_property = p.id_property limit 1),
       p.type,
       p.zone,
       p.address,
       p.price,
       p.state
from property p where `)

    if (title) {
        query.push(Prisma.sql`p.title ilike ${'%' + title + '%'} and`)
    }
    if (type) {
        query.push(Prisma.sql`p.type = ${type} and`)
    }
    if (price) {
        query.push(Prisma.sql`p.price = ${price} and`)
    }
    if (num_rooms) {
        query.push(Prisma.sql`p.num_rooms = ${num_rooms} and`)
    }
    if (square_meters) {
        query.push(Prisma.sql`p.square_meters = ${square_meters} and`)
    }
    if (num_bathrooms) {
        query.push(Prisma.sql`p.num_bathrooms = ${num_bathrooms} and`)
    }
    query.push(Prisma.sql`p.id_agent = ${idUser}`)
    query.push(Prisma.sql`order by `)
    if (asc_price !== undefined) {
        query.push(Prisma.sql`p.price ${asc_price ? Prisma.raw('') : Prisma.raw('DESC')},`)
    }
    if (asc_title !== undefined) {
        query.push(Prisma.sql`p.title ${asc_title ? Prisma.raw('') : Prisma.raw('DESC')},`)
    }
    query.push(Prisma.sql`p.id_property`)
    const result = await DB.$queryRaw<unknown[]>(Prisma.join(query, ' '))
    return result

}
//helado

async function processImage(imageData: string): Promise<string> {
    // Si ya es una URL completa, retornarla directamente
    if (imageData.startsWith('http://') || imageData.startsWith('https://')) {
        return imageData
    }

    // Si es base64 con prefijo data:image/
    if (imageData.startsWith('data:image/')) {
        // Extraer mime type del data URL
        const mimeMatch = imageData.match(/^data:(image\/[^;]+);base64,/)
        const mime: string = (mimeMatch && mimeMatch[1]) ? mimeMatch[1] : 'image/jpeg'
        const ext = guessExtensionFromMime(mime)

        // Decodificar base64 a bytes
        const bytes = decodeBase64ToBytes(imageData)

        // Subir a Supabase Storage
        const storage = getPublicObjectStorage()
        const bucket = getOptionalEnv('SUPABASE_BUCKET_USERS', 'user-images') ?? 'user-images'
        const objectPath = buildPublicBucketPath(['properties', `${crypto.randomUUID()}.${ext}`])

        const uploaded = await storage.uploadObject({
            bucket,
            path: objectPath,
            contentType: mime,
            data: bytes,
        })

        return uploaded.publicUrl
    }

    // Si no es URL ni tiene prefijo, asumir que es base64 puro (sin prefijo)
    const base64WithPrefix = `data:image/jpeg;base64,${imageData}`
    const mime = 'image/jpeg'
    const ext = guessExtensionFromMime(mime)

    const bytes = decodeBase64ToBytes(base64WithPrefix)

    // Subir a Supabase Storage
    const storage = getPublicObjectStorage()
    const bucket = getOptionalEnv('SUPABASE_BUCKET_USERS', 'user-images') ?? 'user-images'
    const objectPath = buildPublicBucketPath(['properties', `${crypto.randomUUID()}.${ext}`])

    const uploaded = await storage.uploadObject({
        bucket,
        path: objectPath,
        contentType: mime,
        data: bytes,
    })

    return uploaded.publicUrl
}

export async function createProperty(agentId: number, input: CreatePropertyInput) {
    if (!input.images || input.images.length === 0) {
        throw new Error('At least one image is required')
    }

    // Validar tipo de propiedad
    const propertyType = PROPERTY_TYPE_MAP[input.type]
    if (!propertyType) {
        throw new Error(`Invalid property type. Valid types: Casa, Apartamento, Terreno, Local Comercial`)
    }

    // Validar estado
    const propertyState = PROPERTY_STATE_MAP[input.state]
    if (!propertyState) {
        throw new Error(`Invalid property state. Valid states: Disponible, No Disponible, Vendido`)
    }

    // Crear la propiedad
    const property = await DB.property.create({
        data: {
            title: input.title,
            type: propertyType,
            address: input.address,
            zone: Number(input.zone),
            price: input.price,
            num_rooms: input.num_rooms,
            num_bathrooms: input.num_bathrooms,
            square_meters: input.square_meters,
            state: propertyState,
            description: input.description,
            id_agent: agentId,
            created_at: new Date(),
        },
    })

    const uploadedImageUrls = await Promise.all(
        input.images.map(imageData => processImage(imageData))
    )

    // Crear las imágenes en la BD
    await Promise.all(
        uploadedImageUrls.map((url, index) =>
            DB.image.create({
                data: {
                    id_property: property.id_property,
                    url_img: url,
                    correlative: index + 1,
                },
            })
        )
    )

    return {
        message: 'Propiedad creada con exito',
        id_property: property.id_property,
    }
}

export async function getPropertyById(agentId: number, propertyId: number) {
    const property = await DB.property.findUnique({
        where: { id_property: propertyId },
        include: {
            image: {
                select: {
                    id_image: true,
                    url_img: true,
                },
                orderBy: {
                    correlative: 'asc',
                },
            },
        },
    })

    if (!property) {
        throw new Error('Property not found')
    }

    if (property.id_agent !== agentId) {
        throw new Error('Property does not belong to this agent')
    }

    return {
        id_property: property.id_property,
        title: property.title,
        type: PROPERTY_TYPE_REVERSE_MAP[property.type] || property.type,
        address: property.address,
        zone: property.zone.toString(),
        price: Number(property.price),
        num_rooms: Number(property.num_rooms),
        num_bathrooms: Number(property.num_bathrooms),
        square_meters: Number(property.square_meters),
        state: PROPERTY_STATE_REVERSE_MAP[property.state] || property.state,
        description: property.description,
        created_at: property.created_at.toISOString().split('T')[0],
        images: property.image,
    }
}

export async function updateProperty(agentId: number, propertyId: number, input: UpdatePropertyInput) {
    const property = await DB.property.findUnique({
        where: { id_property: propertyId },
        select: { id_property: true, id_agent: true },
    })

    if (!property) {
        throw new Error('Property not found')
    }

    if (property.id_agent !== agentId) {
        throw new Error('Property does not belong to this agent')
    }

    const updateData: any = {}

    if (input.title !== undefined) updateData.title = input.title
    if (input.address !== undefined) updateData.address = input.address
    if (input.zone !== undefined) updateData.zone = Number(input.zone)
    if (input.price !== undefined) updateData.price = input.price
    if (input.num_rooms !== undefined) updateData.num_rooms = input.num_rooms
    if (input.num_bathrooms !== undefined) updateData.num_bathrooms = input.num_bathrooms
    if (input.square_meters !== undefined) updateData.square_meters = input.square_meters
    if (input.description !== undefined) updateData.description = input.description

    if (input.type !== undefined) {
        const propertyType = PROPERTY_TYPE_MAP[input.type]
        if (!propertyType) {
            throw new Error(`Invalid property type. Valid types: Casa, Apartamento, Terreno, Local Comercial`)
        }
        updateData.type = propertyType
    }

    if (input.state !== undefined) {
        const propertyState = PROPERTY_STATE_MAP[input.state]
        if (!propertyState) {
            throw new Error(`Invalid property state. Valid states: Disponible, No Disponible, Vendido`)
        }
        updateData.state = propertyState
    }

    // Si se envían imágenes, reemplazar todas
    if (input.images !== undefined && input.images.length > 0) {
        await DB.image.deleteMany({
            where: { id_property: propertyId },
        })

        const uploadedImageUrls = await Promise.all(
            input.images.map(imageData => processImage(imageData))
        )

        await Promise.all(
            uploadedImageUrls.map((url, index) =>
                DB.image.create({
                    data: {
                        id_property: propertyId,
                        url_img: url,
                        correlative: index + 1,
                    },
                })
            )
        )
    }

    await DB.property.update({
        where: { id_property: propertyId },
        data: updateData,
    })

    return {
        message: 'Propiedad editada con exito',
        id_property: propertyId,
    }
}

export async function deleteProperty(agentId: number, propertyId: number) {
    const property = await DB.property.findUnique({
        where: { id_property: propertyId },
        select: { id_property: true, id_agent: true },
    })

    if (!property) {
        throw new Error('Property not found')
    }

    if (property.id_agent !== agentId) {
        throw new Error('Property does not belong to this agent')
    }

    // Las imágenes se eliminan automáticamente por CASCADE
    await DB.property.delete({
        where: { id_property: propertyId },
    })

    return {
        message: 'Se ha eliminado la propiedad',
    }
}

export type ProposeInvitationInput = {
    expected_date: string
    description: string
}

function getInvitationState(invitation: any): string {
    // Solicitud del cliente: is_accepted = null y expected_date = null
    if (invitation.is_accepted === null && invitation.expected_date === null) {
        return 'Solicitud del cliente'
    }
    // Cancelado por el cliente: is_accepted = false
    if (invitation.is_accepted !== null && Number(invitation.is_accepted) === 0) {
        return 'Cancelado por el cliente'
    }
    // Cita agendada: expected_date != null o is_accepted = true
    if (invitation.expected_date !== null || (invitation.is_accepted !== null && Number(invitation.is_accepted) === 1)) {
        return 'Cita agendada'
    }
    return 'Desconocido'
}

export async function getInvitations(agentId: number, type: string) {
    // Validar el tipo
    const validTypes = ['all', 'Pending', 'Accepted', 'Rejected']
    if (!validTypes.includes(type)) {
        throw new Error(`Invalid type. Valid types: ${validTypes.join(', ')}`)
    }

    // Construir la condición WHERE según el tipo
    let whereCondition: any = {
        property: {
            id_agent: agentId,
        },
    }

    if (type === 'Pending') {
        // Solicitud del cliente: is_accepted = null y expected_date = null
        whereCondition.is_accepted = null
        whereCondition.expected_date = null
    } else if (type === 'Accepted') {
        // Cita agendada: expected_date != null O is_accepted = true
        whereCondition.OR = [
            { expected_date: { not: null } },
            { is_accepted: 1 },
        ]
    } else if (type === 'Rejected') {
        // Cancelado: is_accepted = false
        whereCondition.is_accepted = 0
    }
    // Si es 'all', no agregamos filtros adicionales

    const invitations = await DB.invitation.findMany({
        where: whereCondition,
        include: {
            property: {
                select: {
                    title: true,
                    address: true,
                    zone: true,
                    price: true,
                    image: {
                        select: {
                            url_img: true,
                        },
                        take: 1,
                        orderBy: {
                            correlative: 'asc',
                        },
                    },
                },
            },
            USER: {
                select: {
                    name: true,
                    last_name: true,
                },
            },
        },
        orderBy: {
            created_at: 'desc',
        },
    })

    const formattedInvitations = invitations.map((inv) => ({
        id_invitation: inv.id_invitation,
        title: inv.property.title,
        address: inv.property.address,
        zone: inv.property.zone.toString(),
        price: Number(inv.property.price),
        client_name: `${inv.USER.name} ${inv.USER.last_name}`,
        url_img: inv.property.image[0]?.url_img || null,
        state: getInvitationState(inv),
        expected_date: inv.expected_date ? inv.expected_date.toISOString().replace('T', ' ').substring(0, 16) : null,
        description: inv.description,
        justification: inv.justification,
        created_at: inv.created_at.toISOString().split('T')[0],
        is_accepted: inv.is_accepted !== null ? Number(inv.is_accepted) === 1 : null,
    }))

    return { list: formattedInvitations }
}

export async function proposeInvitation(agentId: number, invitationId: number, input: ProposeInvitationInput) {
    // Buscar la invitación y verificar que pertenezca a una propiedad del agente
    const invitation = await DB.invitation.findUnique({
        where: { id_invitation: invitationId },
        include: {
            property: {
                select: {
                    id_agent: true,
                },
            },
        },
    })

    if (!invitation) {
        throw new Error('Invitation not found')
    }

    if (invitation.property.id_agent !== agentId) {
        throw new Error('Invitation does not belong to this agent')
    }

    // Verificar que el estado sea "Solicitud del cliente"
    if (invitation.is_accepted !== null || invitation.expected_date !== null) {
        throw new Error('Can only propose when state is "Solicitud del cliente"')
    }

    // Actualizar la invitación
    await DB.invitation.update({
        where: { id_invitation: invitationId },
        data: {
            expected_date: new Date(input.expected_date),
            description: input.description,
            updated_at: new Date(),
        },
    })

    return {
        message: 'Propuesta enviada exitosamente',
        id_invitation: invitationId,
    }
}
//termina heladoo
