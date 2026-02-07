import type { RequestHandler } from 'express'

import { response_ok, response_with_error } from '../../utils/response.ts'
import { ClientService } from './service.ts'

export class ClientController {
    constructor(private readonly clientService = new ClientService()) {}

    profileClient: RequestHandler = async (req, res) => {
        try {
            console.log('Profile client:', req.user)
            const userId = Number(req.user?.sub)
            const result = await this.clientService.getprofile(userId);

            return response_ok(res, result,)
        } catch (error) {
            console.error('Error in profileClient:', error)
        }
    }
}