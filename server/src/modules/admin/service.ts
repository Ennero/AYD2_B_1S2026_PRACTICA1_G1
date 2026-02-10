import crypto from 'node:crypto'

import DB from '../../db/db.ts'
import { hashPassword } from '../../lib/security.ts'
import { normalizeEmail } from '../../utils/strings.ts'
import { UserType } from '../../store/enums.ts'
import { decodeBase64ToBytes, guessExtensionFromMime } from '../../utils/base64.ts'
import { getPublicObjectStorage } from '../../adapters/storage/index.ts'
import { buildPublicBucketPath } from '../../utils/supabase-storage.ts'
import { getOptionalEnv } from '../../utils/env.ts'

export type CreateAgentInput = {
	id_user?: number
	email: string
	name: string
	last_name: string
	phone: string | number
	url_img?: string | null
	img_base64?: string
	img_mime?: string
	type?: string
}

export type UpdateAgentInput = {
	id_user?: number
	email?: string
	name?: string
	last_name?: string
	phone?: string | number
	url_img?: string | null
	img_base64?: string
	img_mime?: string
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

		// If client provided an image in base64, upload it to Supabase Storage and use its public URL.
		let url_img: string | null = input.url_img ?? null
		if (input.img_base64) {
			const storage = getPublicObjectStorage()
			const bucket = getOptionalEnv('SUPABASE_BUCKET_USERS', 'user-images') ?? 'user-images'
			const mime = input.img_mime ?? 'application/octet-stream'
			const ext = guessExtensionFromMime(mime)
			const bytes = decodeBase64ToBytes(input.img_base64)
			const objectPath = buildPublicBucketPath(['users', `${crypto.randomUUID()}.${ext}`])

			const uploaded = await storage.uploadObject({
				bucket,
				path: objectPath,
				contentType: mime,
				data: bytes,
			})

			url_img = uploaded.publicUrl
		}

		const created = await DB.uSER.create({
			data: {
				...(input.id_user ? { id_user: input.id_user } : {}),
				email,
				password: passwordHash,
				gender: genderDefault,
				type: UserType.Agent,
				name: input.name,
				last_name: input.last_name,
				url_img,
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

		let url_img: string | null | undefined = input.url_img
		if (input.img_base64) {
			const storage = getPublicObjectStorage()
			const bucket = getOptionalEnv('SUPABASE_BUCKET_USERS', 'user-images') ?? 'user-images'
			const mime = input.img_mime ?? 'application/octet-stream'
			const ext = guessExtensionFromMime(mime)
			const bytes = decodeBase64ToBytes(input.img_base64)
			const objectPath = buildPublicBucketPath(['users', `${crypto.randomUUID()}.${ext}`])

			const uploaded = await storage.uploadObject({
				bucket,
				path: objectPath,
				contentType: mime,
				data: bytes,
			})

			url_img = uploaded.publicUrl
		}

		const updated = await DB.uSER.update({
			where: { id_user: agentId },
			data: {
				...(normalizedEmail !== undefined ? { email: normalizedEmail } : {}),
				...(input.name !== undefined ? { name: input.name } : {}),
				...(input.last_name !== undefined ? { last_name: input.last_name } : {}),
				...(input.phone !== undefined ? { phone: String(input.phone) } : {}),
				...(url_img !== undefined ? { url_img } : {}),
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


	//Helado
	async getAgents() {
		const agents = await DB.uSER.findMany({
			where: {
				type: UserType.Agent,
			},
			select: {
				id_user: true,
				email: true,
				name: true,
				last_name: true,
				phone: true,
				url_img: true,
				type: true,
			},
		})

		return { list: agents }
	}

	async getAgentById(agentId: number) {
		const agent = await DB.uSER.findUnique({
			where: {
				id_user: agentId,
			},
			select: {
				id_user: true,
				email: true,
				name: true,
				last_name: true,
				phone: true,
				url_img: true,
				type: true,
			},
		})

		if (!agent) throw new Error('Agent not found')
		if (agent.type !== UserType.Agent) throw new Error('User is not an agent')

		return agent
	}

	async deleteAgent(agentId: number) {
		const existingAgent = await DB.uSER.findUnique({
			where: { id_user: agentId },
			select: { id_user: true, type: true },
		})

		if (!existingAgent) throw new Error('Agent not found')
		if (existingAgent.type !== UserType.Agent) throw new Error('User is not an agent')

		await DB.uSER.delete({
			where: { id_user: agentId },
		})

		return {
			message: 'Se ha eliminado el agente',
		}
	}

// fin helado
}