import type { RequestHandler } from 'express'

import { response_ok, response_with_error } from '../../utils/response.ts'
import { ClientService } from './service.ts'

export class ClientController {
    constructor(private readonly clientService = new ClientService()) {}

    // =============================== DAVID ===============================
    profileClient: RequestHandler = async (req, res) => {
        try {
            const userId = Number(req.user?.sub)
            const result = await this.clientService.getprofile(userId);

            return response_ok(res, result,)
        } catch (error) {
            return response_with_error(res, {
                statusCode: 400,
                message: 'Could not get client profile',
                details: error instanceof Error ? error.message : error,
            })
        }
    }

    updateProfileClient: RequestHandler = async (req, res) => {
        try {
            const userId = Number(req.user?.sub)

            if(!Number.isFinite(userId) || userId <= 0) {
                return response_with_error(res, {
                    statusCode: 400,
                    message: 'Invalid user id',
                })
            }

            const result = await this.clientService.updateProfile(userId, {
                id_user: userId,
                name: req.body.name,
                last_name: req.body.last_name,
                gender: req.body.gender,
                phone: req.body.phone,
                email: req.body.email,
                url_img: req.body.url_img,
                password: req.body.password,
            });

            return response_ok(res, result, 200);
        } catch (error) {
            return response_with_error(res, {
                statusCode: 400,
                message: 'Could not update client profile',
                details: error instanceof Error ? error.message : error,
            })
        }
    }

    propertiesfavorite: RequestHandler = async (req, res) => {
        try {

            const userId = Number(req.user?.sub)
            const result = await this.clientService.propertiesfavorite(userId);
            return response_ok(res, result, 200);
        } catch (error) {
            return response_with_error(res, {
                statusCode: 400,
                message: 'Could not get client favorite properties',
                details: error instanceof Error ? error.message : error,
            })
        }
    }

    deletepropertiesfavorites: RequestHandler = async (req, res) => {
        try {
            const userId = Number(req.user?.sub)
            const id_favorite = Number(req.query.id)
            if(!Number.isFinite(id_favorite) || id_favorite <= 0) {
                return response_with_error(res, {
                    statusCode: 400,
                    message: 'Invalid favorite id',
                })
            }

            const result = await this.clientService.deletepropertiesfavorites(userId, id_favorite);
            return response_ok(res, result, 200);
        } catch (error) {
            return response_with_error(res, {
                statusCode: 400,
                message: 'Could not delete client favorite property',
                details: error instanceof Error ? error.message : error,
            })
        }
    }
    // =============================== DAVID ===============================
}