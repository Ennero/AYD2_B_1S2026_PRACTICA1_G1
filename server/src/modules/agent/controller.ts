import { RequestHandler } from 'express'
import * as service from './service.ts'
import { response_ok, response_with_error } from '../../utils/response.ts'

export const getStats: RequestHandler = async (req, res) => {
    try {
        const result = await service.getStatsFromDB(Number(req.user?.sub))
        res.status(200).json(result)
    } catch (error) {
        return response_with_error(res, {
            statusCode: 400,
            message: 'Could not register user',
            details: error instanceof Error ? error.message : error,
        })
    }
}


