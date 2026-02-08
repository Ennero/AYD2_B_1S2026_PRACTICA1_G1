import type { RequestHandler } from 'express'

import { response_ok, response_with_error } from '../../utils/response.ts'
import { AdminService } from './service.ts'

export class AdminController {
    constructor(private readonly adminService = new AdminService()) {}

    createAgent: RequestHandler = async (req, res) => {
        try {
            const result = await this.adminService.createAgent({
                id_user: req.body.id_user,
                email: req.body.email,
                name: req.body.name,
                last_name: req.body.last_name,
                phone: req.body.phone,
                url_img: req.body.url_img,
                type: req.body.type,
            })

            return response_ok(res, result, 201)
        } catch (error) {
            return response_with_error(res, {
                statusCode: 400,
                message: 'Could not create agent',
                details: error instanceof Error ? error.message : error,
            })
        }
    }

    updateAgent: RequestHandler = async (req, res) => {
        try {
            const agentId = Number(req.params.id)
            if (!Number.isFinite(agentId) || agentId <= 0) {
                return response_with_error(res, {
                    statusCode: 400,
                    message: 'Invalid agent id',
                })
            }

            const result = await this.adminService.updateAgent(agentId, {
                id_user: req.body.id_user,
                email: req.body.email,
                name: req.body.name,
                last_name: req.body.last_name,
                phone: req.body.phone,
                url_img: req.body.url_img,
                type: req.body.type,
            })

            return response_ok(res, result)
        } catch (error) {
            return response_with_error(res, {
                statusCode: 400,
                message: 'Could not update agent',
                details: error instanceof Error ? error.message : error,
            })
        }
    }
}