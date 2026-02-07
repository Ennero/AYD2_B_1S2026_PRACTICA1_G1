import type { RequestHandler } from 'express'

import { extractBearerToken, verifyAuthToken } from '../lib/security.ts'
import { response_with_error } from '../utils/response.ts'

export const authMiddleware: RequestHandler = (req, res, next) => {
    try {
        const token = extractBearerToken(req.header('authorization'))
        if (!token) {
            return response_with_error(res, {
                statusCode: 401,
                message: 'Missing Bearer token',
            })
        }

        const payload = verifyAuthToken(token)
        req.user = payload

        return next()
    } catch (error) {
        return response_with_error(res, {
            statusCode: 401,
            message: 'Invalid token',
            details: error instanceof Error ? error.message : error,
        })
    }
}
