

import crypto from 'node:crypto'

import DB from '../../db/db.ts'
import { hashPassword } from '../../lib/security.ts'
import { normalizeEmail } from '../../utils/strings.ts'
import { UserType } from '../../store/enums.ts'

export type CreateAgentInput = {
	id_user?: number
	email: string
	name: string
	last_name: string
	phone: string | number
	url_img?: string | null
	type?: string
}

export type UpdateAgentInput = {
	id_user?: number
	email?: string
	name?: string
	last_name?: string
	phone?: string | number
	url_img?: string | null
	type?: string
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
}