import DB from '../../db/db.ts'
import { UserType } from '../../store/enums.ts'
import { hashPassword, signAuthToken, verifyPassword } from '../../lib/security.ts'
import { normalizeEmail } from '../../utils/strings.ts'
import { decodeBase64ToBytes, guessExtensionFromMime } from '../../utils/base64.ts'
import { getPublicObjectStorage } from '../../adapters/storage/index.ts'
import { buildPublicBucketPath } from '../../utils/supabase-storage.ts'
import { getOptionalEnv } from '../../utils/env.ts'
import crypto from 'node:crypto'

export async function registerUser(input: {
    email: string
    password: string
    name: string
    last_name: string
    url_img?: string | null
    img_base64?: string
    img_mime?: string
    phone: string
    gender: number | string
}) {
    const email = normalizeEmail(input.email)

    const existing = await DB.uSER.findUnique({
        where: { email },
        select: { id_user: true },
    })
    if (existing) throw new Error('Email already registered')

    const passwordHash = await hashPassword(input.password)

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

    const user = await DB.uSER.create({
        data: {
            email,
            password: passwordHash,
            gender: Number(input.gender),
            type: UserType.Client,
            name: input.name,
            last_name: input.last_name,
            url_img,
            phone: input.phone,
            created_at: new Date(),
        },
        select: {
            id_user: true,
            email: true,
            type: true,
            name: true,
            last_name: true,
            url_img: true,
        },
    })

    const token = signAuthToken({
        sub: String(user.id_user),
        email: user.email,
        type: user.type,
    })

    return { user, token }
}

export async function loginUser(input: { email: string; password: string }) {
    const email = normalizeEmail(input.email)
    const user = await DB.uSER.findUnique({
        where: { email },
        select: {
            id_user: true,
            email: true,
            password: true,
            type: true,
            name: true,
            last_name: true,
            url_img: true,
        },
    })

    if (!user) throw new Error('User not found')

    const isValid = await verifyPassword(input.password, user.password)
    if (!isValid) throw new Error('Invalid password')

    const token = signAuthToken({
        sub: String(user.id_user),
        email: user.email,
        type: user.type,
    })

    const { password: _password, ...safeUser } = user
    return { user: safeUser, token }
}