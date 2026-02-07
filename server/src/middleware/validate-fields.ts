import type { RequestHandler } from 'express'
import { validationResult } from 'express-validator'

import { response_with_error } from '../utils/response.ts'

export const validateFields: RequestHandler = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) return next()

    return response_with_error(res, {
        statusCode: 400,
        message: 'Validation error',
        details: errors.array(),
    })
}
