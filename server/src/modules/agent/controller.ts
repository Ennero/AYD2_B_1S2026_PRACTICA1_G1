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

//Helado
export const createProperty: RequestHandler = async (req, res) => {
    try {
        const agentId = Number(req.user?.sub)
        const result = await service.createProperty(agentId, req.body)
        return response_ok(res, result, 201)
    } catch (error) {
        return response_with_error(res, {
            statusCode: 400,
            message: 'Could not create property',
            details: error instanceof Error ? error.message : error,
        })
    }
}

export const getPropertyById: RequestHandler = async (req, res) => {
    try {
        const agentId = Number(req.user?.sub)
        const propertyId = Number(req.params.id)
        
        if (!Number.isFinite(propertyId) || propertyId <= 0) {
            return response_with_error(res, {
                statusCode: 400,
                message: 'Invalid property id',
            })
        }

        const result = await service.getPropertyById(agentId, propertyId)
        return response_ok(res, result)
    } catch (error) {
        return response_with_error(res, {
            statusCode: 404,
            message: 'Property not found',
            details: error instanceof Error ? error.message : error,
        })
    }
}

export const updateProperty: RequestHandler = async (req, res) => {
    try {
        const agentId = Number(req.user?.sub)
        const propertyId = Number(req.params.id)
        
        if (!Number.isFinite(propertyId) || propertyId <= 0) {
            return response_with_error(res, {
                statusCode: 400,
                message: 'Invalid property id',
            })
        }

        const result = await service.updateProperty(agentId, propertyId, req.body)
        return response_ok(res, result)
    } catch (error) {
        return response_with_error(res, {
            statusCode: 400,
            message: 'Could not update property',
            details: error instanceof Error ? error.message : error,
        })
    }
}

export const deleteProperty: RequestHandler = async (req, res) => {
    try {
        const agentId = Number(req.user?.sub)
        const propertyId = Number(req.params.id)
        
        if (!Number.isFinite(propertyId) || propertyId <= 0) {
            return response_with_error(res, {
                statusCode: 400,
                message: 'Invalid property id',
            })
        }

        const result = await service.deleteProperty(agentId, propertyId)
        return response_ok(res, result)
    } catch (error) {
        return response_with_error(res, {
            statusCode: 400,
            message: 'Could not delete property',
            details: error instanceof Error ? error.message : error,
        })
    }

    //fin helado
}
