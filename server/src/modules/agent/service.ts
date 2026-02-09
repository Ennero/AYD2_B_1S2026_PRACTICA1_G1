import DB from '../../db/db.ts'
import { resultCounts, resultChart1, resultChart2 } from './dto.ts'
import { Prisma } from '../../generated/prisma/client.ts'

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