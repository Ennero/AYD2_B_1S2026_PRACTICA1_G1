import type { RequestHandler } from 'express'

import { response_with_error } from '../utils/response.ts'

export function requireRole(allowedRoles: string | string[]): RequestHandler {
    const allowed = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]

    return (req, res, next) => {
        if (!req.user) {
            return response_with_error(res, {
                statusCode: 401,
                message: 'Unauthorized',
            })
        }

        if (!allowed.includes(req.user.type)) {
            return response_with_error(res, {
                statusCode: 403,
                message: 'Forbidden',
                details: {
                    required: allowed,
                    current: req.user.type,
                },
            })
        }

        return next()
    }
}
