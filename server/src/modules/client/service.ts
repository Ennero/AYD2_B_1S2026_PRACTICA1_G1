import DB from '../../db/db.ts'
import { hashPassword } from '../../lib/security.ts'
import { normalizeEmail } from '../../utils/strings.ts'
import { UserType } from '../../store/enums.ts'

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
	async getprofile(id_user : number) {
        console.log('Getting profile for user id:', id_user)  
        // Casteo de sting a numero, por si acaso
        id_user = Number(id_user)
        const user = await DB.uSER.findUnique({
            where: { id_user: id_user },
            select: { id_user: true, name: true, last_name: true, gender: true, phone: true, email: true, url_img: true, password: true },
        })

        if (!user){
            throw new Error('User not found')
        }
		return {
            id_user: user.id_user,
            name: user.name,
            last_name: user.last_name,
            gender: (Number(user.gender) === 1)? 'Male' : 'Female',
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
			select: { id_user: true, name: true, last_name:true, gender: true, phone:true, email: true, url_img: true, password: true, type: true },
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

		const updated = await DB.uSER.update({
			where: { id_user: clientid },
			data: {
				...(input.name !== undefined ? { name: input.name } : {}),
				...(input.last_name !== undefined ? { last_name: input.last_name } : {}),
                ...(input.gender !== undefined ? { gender: (input.gender.toLowerCase() === 'male' ? 1 : 2) } : {}),
				...(input.phone !== undefined ? { phone: String(input.phone) } : {}),
                ...(input.email !== undefined ? { email: normalizedEmail } : {}),
				...(input.url_img !== undefined ? { url_img: input.url_img } : {}),
                ...(input.password !== undefined ? { password: await hashPassword(input.password) } : {}),
				type: UserType.Client,
			},
			select: { id_user: true },
		})

		return {
			message: 'Cliente editado con exito',
			id_user: updated.id_user,
		}
	}
}