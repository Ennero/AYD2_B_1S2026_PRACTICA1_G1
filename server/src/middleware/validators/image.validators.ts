import { body, type ValidationChain } from 'express-validator'

export function base64ImageValidator(field = 'img_base64'): ValidationChain {
    return body(field)
        .optional({ nullable: true })
        .isString()
        .custom((v) => {
            const s = String(v).trim()
            // Accepts "data:image/png;base64,..." or raw base64
            const b64 = s.includes('base64,') ? s.split('base64,')[1] : s
            if (!b64 || b64.length < 16) throw new Error(`${field} is invalid`)
            if (!/^[A-Za-z0-9+/=\s]+$/.test(b64)) throw new Error(`${field} is invalid`)
            return true
        })
}

export function imageMimeValidator(field = 'img_mime'): ValidationChain {
    return body(field).optional({ nullable: true }).isMimeType().withMessage(`${field} must be a valid mime type`)
}
