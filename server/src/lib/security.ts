import * as bcryptModule from 'bcryptjs'
import * as jwtModule from 'jsonwebtoken'
import { EnvVars } from '../store/enviroment.ts'

// import { getRequiredEnv } from '../utils/env.ts'

export type AuthTokenPayload = {
    sub: string
    email: string
    type: string
}

// When using NodeNext + ESM, CommonJS libs sometimes come through as { default: exports }
const bcrypt = ((bcryptModule as unknown as { default?: typeof bcryptModule }).default ?? bcryptModule) as typeof bcryptModule
const jwt = ((jwtModule as unknown as { default?: typeof jwtModule }).default ?? jwtModule) as typeof jwtModule

const DEFAULT_BCRYPT_ROUNDS = 10

export async function hashPassword(plainPassword: string, rounds = DEFAULT_BCRYPT_ROUNDS) {
    return bcrypt.hash(plainPassword, rounds)
}

export async function verifyPassword(plainPassword: string, passwordHash: string) {
    return bcrypt.compare(plainPassword, passwordHash)
}

export function signAuthToken(payload: AuthTokenPayload, expiresIn: jwtModule.SignOptions['expiresIn'] = '7d') {
    const secret = EnvVars.instance.JWT_SECRET
    return jwt.sign(payload, secret, { expiresIn })
}

export function verifyAuthToken(token: string): AuthTokenPayload {
    const secret = EnvVars.instance.JWT_SECRET
    const decoded = jwt.verify(token, secret)

    if (typeof decoded !== 'object' || decoded === null) {
        throw new Error('Invalid token payload')
    }

    const maybe = decoded as Partial<AuthTokenPayload>
    if (!maybe.sub || !maybe.email || !maybe.type) {
        throw new Error('Invalid token payload fields')
    }

    return {
        sub: String(maybe.sub),
        email: String(maybe.email),
        type: String(maybe.type),
    }
}

export function extractBearerToken(authHeader: string | undefined): string | null {
    if (!authHeader) return null
    const [scheme, token] = authHeader.split(' ')
    if (scheme?.toLowerCase() !== 'bearer' || !token) return null
    return token
}
