import type { RequestHandler } from 'express'

import * as service from './service.ts'
import { response_ok, response_with_error } from '../../utils/response.ts'

export const register: RequestHandler = async (req, res) => {
    try {
        const result = await service.registerUser({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            last_name: req.body.last_name,
            url_img: req.body.url_img,
            img_base64: req.body.img_base64,
            img_mime: req.body.img_mime,
            phone: req.body.phone,
            gender: req.body.gender,
        })

        return response_ok(res, result, 201)
    } catch (error) {
        return response_with_error(res, {
            statusCode: 400,
            message: 'Could not register user',
            details: error instanceof Error ? error.message : error,
        })
    }
}

export const login: RequestHandler = async (req, res) => {
    try {
        const result = await service.loginUser({
            email: req.body.email,
            password: req.body.password,
        })

        return response_ok(res, result)
    } catch (error) {
        return response_with_error(res, {
            statusCode: 401,
            message: 'Invalid credentials',
            details: error instanceof Error ? error.message : error,
        })
    }
}

export const me: RequestHandler = async (req, res) => {
    if (!req.user) {
        return response_with_error(res, { statusCode: 401, message: 'Unauthorized' })
    }

    return response_ok(res, { user: req.user })
}

