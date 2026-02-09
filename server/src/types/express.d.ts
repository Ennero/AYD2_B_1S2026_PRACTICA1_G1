import type { AuthTokenPayload } from '../lib/security.ts'

declare global {
    namespace Express {
        interface Request {
            user?: AuthTokenPayload
        }
    }
}

export {}
