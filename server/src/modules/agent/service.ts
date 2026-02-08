import DB from '../../db/db.ts'
import { resultCounts, resultChart1, resultChart2 } from './dto.ts'

export async function getStatsFromDB(idUser: number) {
    const resultCounts = await DB.$queryRaw<resultCounts>`
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
    return { ...resultCounts, most_searched: resultChart1, most_offered_zones: resultChart2 }
}