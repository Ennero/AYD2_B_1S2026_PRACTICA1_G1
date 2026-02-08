

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

export class AdminService {
	async createAgent(input: CreateAgentInput) {
		const email = normalizeEmail(input.email)

		const existing = await DB.uSER.findUnique({
			where: { email },
			select: { id_user: true },
		})
		if (existing) throw new Error('Email already registered')

		// Endpoint spec doesn't provide password; generate a temporary one.
		const temporaryPassword = crypto.randomBytes(9).toString('base64url')
		const passwordHash = await hashPassword(temporaryPassword)

		// NOTE: schema requires gender; since the endpoint spec doesn't include it,
		// we set a neutral default (0). If your domain requires otherwise, change it.
		const genderDefault = 0

		const created = await DB.uSER.create({
			data: {
				...(input.id_user ? { id_user: input.id_user } : {}),
				email,
				password: passwordHash,
				gender: genderDefault,
				type: UserType.Agent,
				name: input.name,
				last_name: input.last_name,
				url_img: input.url_img ?? null,
				phone: String(input.phone),
				created_at: new Date(),
			},
			select: {
				id_user: true,
				email: true,
				type: true,
				name: true,
				last_name: true,
				phone: true,
				url_img: true,
				created_at: true,
			},
		})

		return {
			agent: created,
			temporaryPassword,
		}
	}

	async updateAgent(agentId: number, input: UpdateAgentInput) {
		if (input.id_user !== undefined && Number(input.id_user) !== agentId) {
			throw new Error('id_user in body does not match :id param')
		}

		const existingAgent = await DB.uSER.findUnique({
			where: { id_user: agentId },
			select: { id_user: true, type: true, email: true },
		})

		if (!existingAgent) throw new Error('Agent not found')
		if (existingAgent.type !== UserType.Agent) throw new Error('User is not an agent')

		let normalizedEmail: string | undefined
		if (input.email !== undefined) {
			normalizedEmail = normalizeEmail(input.email)

			const emailOwner = await DB.uSER.findUnique({
				where: { email: normalizedEmail },
				select: { id_user: true },
			})

			if (emailOwner && emailOwner.id_user !== agentId) {
				throw new Error('Email already registered')
			}
		}

		const updated = await DB.uSER.update({
			where: { id_user: agentId },
			data: {
				...(normalizedEmail !== undefined ? { email: normalizedEmail } : {}),
				...(input.name !== undefined ? { name: input.name } : {}),
				...(input.last_name !== undefined ? { last_name: input.last_name } : {}),
				...(input.phone !== undefined ? { phone: String(input.phone) } : {}),
				...(input.url_img !== undefined ? { url_img: input.url_img } : {}),
				// Force AGENT type regardless of payload
				type: UserType.Agent,
			},
			select: { id_user: true },
		})

		return {
			message: 'Agente editado con exito',
			id_user: updated.id_user,
		}
	}
}