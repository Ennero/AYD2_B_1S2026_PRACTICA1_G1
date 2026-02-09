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
            message: 'Could not get the Stats values for agent',
            details: error instanceof Error ? error.message : error,
        })
    }
}

export const filter: RequestHandler = async (req, res) => {
    try {
        const result = await service.filterFromDB(Number(req.user?.sub), req.body?.title, req.body?.type, req.body?.price, req.body?.rooms, req.body?.meter, req.body?.bathrooms, req.body?.is_ascendent_price, req.body?.is_ascendent_title)
        res.status(200).json(result)
    } catch (error) {
        return response_with_error(res, {
            statusCode: 400,
            message: 'Could not filter properties',
            details: error instanceof Error ? error.message : error,
        })
    }
}


