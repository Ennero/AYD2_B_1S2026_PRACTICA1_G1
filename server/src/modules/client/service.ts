import DB from '../../db/db.ts'
import { hashPassword } from '../../lib/security.ts'
import { normalizeEmail } from '../../utils/strings.ts'
import { UserType } from '../../store/enums.ts'
import { Prisma } from '../../generated/prisma/client.ts'
import { InvitationState } from '../../store/enums.ts'
import { decodeBase64ToBytes, guessExtensionFromMime } from '../../utils/base64.ts'
import { getPublicObjectStorage } from '../../adapters/storage/index.ts'
import { buildPublicBucketPath } from '../../utils/supabase-storage.ts'
import { getOptionalEnv } from '../../utils/env.ts'
import crypto from 'node:crypto'

export type UpdateClientInput = {
	id_user?: number
	name?: string
	last_name?: string,
	gender?: string,
	phone?: string
	email?: string
	url_img?: string | null
	password?: string
}

export class ClientService {
	// =============================== DAVID ===============================
	async getprofile(id_user: number) {
		console.log('Getting profile for user id:', id_user)
		// Casteo de sting a numero, por si acaso
		id_user = Number(id_user)
		const user = await DB.uSER.findUnique({
			where: { id_user: id_user },
			select: { id_user: true, name: true, last_name: true, gender: true, phone: true, email: true, url_img: true, password: true },
		})

		if (!user) {
			throw new Error('User not found')
		}
		return {
			id_user: user.id_user,
			name: user.name,
			last_name: user.last_name,
			gender: (Number(user.gender) === 1) ? 'Male' : 'Female',
			phone: user.phone,
			email: user.email,
			url_img: user.url_img,
			password: user.password
		}
	}

	async updateProfile(clientid: number, input: UpdateClientInput) {
		if (input.id_user !== undefined && Number(input.id_user) !== clientid) {
			throw new Error('id_user in body does not match :id param')
		}

		const existingClient = await DB.uSER.findUnique({
			where: { id_user: clientid },
			select: { id_user: true, name: true, last_name: true, gender: true, phone: true, email: true, url_img: true, password: true, type: true },
		})

		if (!existingClient) throw new Error('Client not found')

		let normalizedEmail = "";
		if (input.email !== undefined) {
			normalizedEmail = normalizeEmail(input.email)

			const emailOwner = await DB.uSER.findUnique({
				where: { email: normalizedEmail },
				select: { id_user: true },
			})

			if (emailOwner && emailOwner.id_user !== clientid) {
				throw new Error('Email already registered')
			}
		}

		// Procesar imagen si es base64 (data:image/...)
		let finalUrlImg = input.url_img
		if (input.url_img && input.url_img.startsWith('data:image/')) {
			console.log('[CLIENT SERVICE] Detectado base64, subiendo a Supabase...')
			
			// Extraer mime type del data URL
			const mimeMatch = input.url_img.match(/^data:(image\/[^;]+);base64,/)
			const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg'
			const ext = guessExtensionFromMime(mime)
			
			// Decodificar base64 a bytes
			const bytes = decodeBase64ToBytes(input.url_img)
			
			// Subir a Supabase Storage
			const storage = getPublicObjectStorage()
			const bucket = getOptionalEnv('SUPABASE_BUCKET_USERS', 'user-images') ?? 'user-images'
			const objectPath = buildPublicBucketPath(['users', `${crypto.randomUUID()}.${ext}`])
			
			const uploaded = await storage.uploadObject({
				bucket,
				path: objectPath,
				contentType: mime,
				data: bytes,
			})
			
			finalUrlImg = uploaded.publicUrl
			console.log('[CLIENT SERVICE] Imagen subida correctamente:', finalUrlImg)
		}

		const updated = await DB.uSER.update({
			where: { id_user: clientid },
			data: {
				...(input.name !== undefined ? { name: input.name } : {}),
				...(input.last_name !== undefined ? { last_name: input.last_name } : {}),
				...(input.gender !== undefined ? { gender: (input.gender.toLowerCase() === 'male' ? 1 : 2) } : {}),
				...(input.phone !== undefined ? { phone: String(input.phone) } : {}),
				...(input.email !== undefined ? { email: normalizedEmail } : {}),
				...(finalUrlImg !== undefined ? { url_img: finalUrlImg } : {}),
				...(input.password !== undefined ? { password: await hashPassword(input.password) } : {}),
				type: UserType.Client,
			},
			select: { id_user: true },
		})

		return {
			message: 'Datos de perfil actualizados correctamente',
			id_user: updated.id_user,
		}
	}

	async propertiesfavorite(id_user: number) {
		console.log('Getting profile for user id:', id_user);
		id_user = Number(id_user);

		const properties = await DB.favorite.findMany({
			where: { id_client: id_user },
			include: { 
				property: {
					include: { image: true }
				}
			}
		})

		if (!properties) {
			throw new Error('No favorite properties found for this user')
		}

		return properties.map(fav => ({
			id_favorite: fav.id_favorite,
			title: fav.property.title,
			price: fav.property.price,
			num_rooms: fav.property.num_rooms,
			num_bathrooms: fav.property.num_bathrooms,
			square_meters: fav.property.square_meters,
			address: fav.property.address,
			id_property: fav.id_property,
			url_img: fav.property.image?.[0]?.url_img || null,
			zone: fav.property.zone,
			type: fav.property.type
		}))

	}

	async deletepropertiesfavorites(id_user: number, id_property: number) {
		id_user = Number(id_user);
		id_property = Number(id_property);

		if (!Number.isFinite(id_property) || id_property <= 0) {
			throw new Error('Invalid property id')
		}

		if (!Number.isFinite(id_user) || id_user <= 0) {
			throw new Error('Invalid user id')
		}

		// Eliminar usando id_property + id_client
		const deleteFavorite = await DB.favorite.deleteMany({
			where: {
				id_property: id_property,
				id_client: id_user
			}
		})

		if (deleteFavorite.count === 0) {
			throw new Error('Favorite property not found for this user')
		}

		return {
			message: 'Propiedad eliminada de favoritos',
			id_property: id_property
		}
	}

	async getpropertybyid(id_user: number, id_property: number) {
		id_user = Number(id_user);
		id_property = Number(id_property);

		const property = await DB.property.findUnique({
			where: { id_property: id_property },
			include: {
				image: true,
				// Traemos al agente directamente
				USER: true,
				// Traemos el favorito solo si coincide con este usuario
				favorite: {
					where: { id_client: id_user }
				}
			}
		});

		if (!property) throw new Error('Property not found');

		return {
			id_property: property.id_property,
			title: property.title,
			address: property.address,
			price: property.price,
			description: property.description,
			zone: property.zone,
			num_rooms: property.num_rooms,
			num_bathrooms: property.num_bathrooms,
			square_meters: property.square_meters,
			type: property.type,
			image: property.image.map(img => img.url_img),
			already_in_favorite: property.favorite.length > 0,
			estate_agent: property.USER.name,
		}
	}

	async addpropertytofavorite(id_user: number, id_property: number) {
		id_user = Number(id_user);
		id_property = Number(id_property);

		const existingFavorite = await DB.favorite.findFirst({
			where: { id_client: id_user, id_property: id_property }
		})

		if (existingFavorite) {
			throw new Error('Property already in favorites')
		}

		// Anadimos creando la tabla de favoritos
		const newFavorite = await DB.favorite.create({
			data: {
				created_at: new Date(),
				id_client: id_user,
				id_property: id_property
			}
		})

		return {
			message: 'Propiedad añadida a favoritos',
			id_favorite: newFavorite.id_favorite
		}
	}

	async getallappointments(id_user: number) {
		id_user = Number(id_user);

		const appointments = await DB.invitation.findMany({
			where: { id_client: id_user },
			include: {
				property: {
					include: {
						image: {
							take: 1, // Solo traemos una imagen para mostrar en la lista
							select: { url_img: true }
						},
						USER: true, // Traemos el agente para mostrar su nombre en la lista de citas
					}
				},
			}
		})

		if (!appointments || appointments.length === 0) {
			throw new Error('No appointments found for this user')
		}
		return appointments.map(app => ({
			id_invitation: app.id_invitation,
			id_property: app.id_property,
			id_client: app.id_client,
			title: app.property.title,
			address: app.property.address,
			id_agent: app.property.id_agent,
			agent_name: app.property.USER.name,
			img: app.property.image[0]?.url_img || 'placeholder.jpg',
			status: app.status,
			description: app.description,
			expected_date: app.expected_date,
			is_accepted: app.is_accepted?.toString() === '1' ? true : app.is_accepted?.toString() === '0' ? false : null,
			justification: app.justification,
		}))
	}

	async getfinalizedappointments(id_user: number) {
		id_user = Number(id_user);

		id_user = Number(id_user);

		const appointments = await DB.invitation.findMany({
			where: {
				id_client: id_user,
				OR: [
					{ status: InvitationState.Rejected },
					{ status: InvitationState.Accepted }
				]
			},
			include: {
				property: {
					include: {
						image: {
							take: 1,
							select: { url_img: true }
						},
						USER: true,
					}
				},
			}
		})

		if (!appointments || appointments.length === 0) {
			throw new Error('No appointments found for this user')
		}
		return appointments.map(app => ({
			id_invitation: app.id_invitation,
			id_property: app.id_property,
			id_client: app.id_client,
			title: app.property.title,
			address: app.property.address,
			id_agent: app.property.id_agent,
			agent_name: app.property.USER.name,
			img: app.property.image[0]?.url_img || 'placeholder.jpg',
			status: app.status,
			description: app.description,
			expected_date: app.expected_date,
			is_accepted: app.is_accepted?.toString() === '1' ? true : app.is_accepted?.toString() === '0' ? false : null,
			justification: app.justification,
		}))
	}

	async getpendingappointments(id_user: number) {
		id_user = Number(id_user);

		const appointments = await DB.invitation.findMany({
			where: { id_client: id_user, status: InvitationState.Pending },
			include: {
				property: {
					include: {
						image: {
							take: 1,
							select: { url_img: true }
						},
						USER: true,
					}
				},
			}
		})

		if (!appointments || appointments.length === 0) {
			throw new Error('No appointments found for this user')
		}
		return appointments.map(app => ({
			id_invitation: app.id_invitation,
			id_property: app.id_property,
			id_client: app.id_client,
			title: app.property.title,
			address: app.property.address,
			id_agent: app.property.id_agent,
			agent_name: app.property.USER.name,
			img: app.property.image[0]?.url_img || 'placeholder.jpg',
			status: app.status,
			description: app.description,
			expected_date: app.expected_date,
			is_accepted: app.is_accepted?.toString() === '1' ? true : app.is_accepted?.toString() === '0' ? false : null,
			justification: app.justification,
		}))
	}

	async getacknowledgeappointments(id_user: number) {
		id_user = Number(id_user);

		const appointments = await DB.invitation.findMany({
			where: { id_client: id_user, status: InvitationState.Acknowledge },
			include: {
				property: {
					include: {
						image: {
							take: 1,
							select: { url_img: true }
						},
						USER: true,
					}
				},
			}
		})

		if (!appointments || appointments.length === 0) {
			throw new Error('No appointments found for this user')
		}
		return appointments.map(app => ({
			id_invitation: app.id_invitation,
			id_property: app.id_property,
			id_client: app.id_client,
			title: app.property.title,
			address: app.property.address,
			id_agent: app.property.id_agent,
			agent_name: app.property.USER.name,
			img: app.property.image[0]?.url_img || 'placeholder.jpg',
			status: app.status,
			description: app.description,
			expected_date: app.expected_date,
			is_accepted: app.is_accepted?.toString() === '1' ? true : app.is_accepted?.toString() === '0' ? false : null,
			justification: app.justification,
		}))
	}

	async acknowledgeappointment(id_user: number, id_property: number, status: string, justification?: string) {

		const invitation = await DB.invitation.findFirst({
			where: { id_client: id_user, id_property: id_property, status: InvitationState.Acknowledge }
		})

		if (!invitation) {
			throw new Error('Appointment not found')
		}

		await DB.invitation.updateMany({
			where: { id_client: id_user, id_property: id_property, status: InvitationState.Acknowledge },
			data: {
				status: status.toUpperCase(),
				justification: justification || null,
				is_accepted: status.toLowerCase() === 'accepted' ? 1 : 0,
			}
		})

		return {
			message: (status.toLowerCase() === 'accepted' ? 'Cita aceptada' : 'La cita ha sido rechazada'),
		}
	}
	// =============================== DAVID ===============================
	async filterFromDB(idUser: number, title: string | undefined, type: string | undefined, price: number | undefined, num_rooms: number | undefined, square_meters: number | undefined, num_bathrooms: number | undefined, asc_price: boolean | undefined, asc_title: boolean | undefined, asc_date: boolean | undefined, asc_area: boolean | undefined) {

		let query: Prisma.Sql[] = [];
		query.push(Prisma.sql`select p.id_property,
       p.title,
       (select image.url_img from image inner join property on image.id_property = property.id_property where property.id_property = p.id_property limit 1),
       p.type,
       p.zone,
       p.address,
       p.price,
       p.state,
       p.num_rooms,
       p.num_bathrooms,
       p.square_meters,
	   case
        when (select count(*) from favorite f where f.id_client = ${idUser} and f.id_property = p.id_property) > 0 then true
        else false
        end as already_in_favorite
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
		query.push(Prisma.sql`p.state = 'AVAILABLE'`)
		query.push(Prisma.sql`order by `)
		if (asc_price !== undefined) {
			query.push(Prisma.sql`p.price ${asc_price ? Prisma.raw('') : Prisma.raw('DESC')},`)
		}
		if (asc_title !== undefined) {
			query.push(Prisma.sql`p.title ${asc_title ? Prisma.raw('') : Prisma.raw('DESC')},`)
		}
		if (asc_date !== undefined) {
			query.push(Prisma.sql`p.created_at ${asc_date ? Prisma.raw('') : Prisma.raw('DESC')},`)
		}
		if (asc_area !== undefined) {
			query.push(Prisma.sql`p.square_meters ${asc_area ? Prisma.raw('') : Prisma.raw('DESC')},`)
		}
		query.push(Prisma.sql`p.id_property`)
		const result = await DB.$queryRaw<unknown[]>(Prisma.join(query, ' '))
		return result

	}

	async lookUpPropertyFromDB(idUser: number, id_property: number) {
		idUser = Number(idUser);
		id_property = Number(id_property);

		console.log('[SERVICE] lookUpProperty - User:', idUser, 'Property:', id_property);

		if (!Number.isFinite(idUser) || idUser <= 0) {
			throw new Error('Invalid user id')
		}

		if (!Number.isFinite(id_property) || id_property <= 0) {
			throw new Error('Invalid property id')
		}

		await DB.record.create({
			data: {
				created_at: new Date(),
				id_client: idUser,
				id_property: id_property
			}
		})
	}

	async getAvailableZones() {
		const zones = await DB.property.findMany({
			where: {
				state: 'AVAILABLE'
			},
			select: {
				zone: true
			},
			distinct: ['zone']
		})

		return zones.map(z => z.zone).filter(z => z !== null).sort()
	}

}