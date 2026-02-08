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

            // return response_ok(res, result,)
            return res.json(result)
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

            // return response_ok(res, result, 200);
            return res.json(result)
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
            // return response_ok(res, result, 200);
            return res.json({
                total: result.length,
                favorites: result,
            })
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
            // return response_ok(res, result, 200);
            return res.json(result)
        } catch (error) {
            return response_with_error(res, {
                statusCode: 400,
                message: 'Could not delete client favorite property',
                details: error instanceof Error ? error.message : error,
            })
        }
    }

    getpropertybyid: RequestHandler = async (req, res) => {
        try {
            const user_id = Number(req.user?.sub);
            const id_property = Number(req.query.id)
            if(!Number.isFinite(id_property) || id_property <= 0) {
                return response_with_error(res, {
                    statusCode: 400,
                    message: 'Invalid property id',
                })
            }

            const result = await this.clientService.getpropertybyid(user_id, id_property);
            // return response_ok(res, result, 200);
            return res.json(result)
        } catch (error) {
            return response_with_error(res, {
                statusCode: 400,
                message: 'Could not get property by id',
                details: error instanceof Error ? error.message : error,
            })
        }
    }

    addpropertytofavorite: RequestHandler = async (req, res) => {
        try {
            const user_id = Number(req.user?.sub);
            const id_property = Number(req.body.id_property)
            if(!Number.isFinite(id_property) || id_property <= 0) {
                return response_with_error(res, {
                    statusCode: 400,
                    message: 'Invalid property id',
                })
            }
            const result = await this.clientService.addpropertytofavorite(user_id, id_property);
            // return response_ok(res, result, 200);
            return res.json(result)
        } catch (error) {
            return response_with_error(res, {
                statusCode: 400,
                message: 'Could not add property to favorites',
                details: error instanceof Error ? error.message : error,
            })
        }
    }

    getallappointments: RequestHandler = async (req, res) => {
        try {
            const user_id = Number(req.user?.sub);
            const result = await this.clientService.getallappointments(user_id);
            return res.json({
                appoinments: result,
            })
        } catch (error) {
            return response_with_error(res, {
                statusCode: 400,
                message: 'Could not get client appointments',
                details: error instanceof Error ? error.message : error,
            })
        }
    }

    getfinalizedappointments: RequestHandler = async (req, res) => {
        try {
            const user_id = Number(req.user?.sub);
            const result = await this.clientService.getfinalizedappointments(user_id);
            return res.json({
                appoinments: result,
            })

        } catch (error) {
            return response_with_error(res, {
                statusCode: 400,
                message: 'Could not get client finalized appointments',
                details: error instanceof Error ? error.message : error,
            })
        }
    }

    getpendingappointments: RequestHandler = async (req, res) => {
        try {
            const user_id = Number(req.user?.sub);
            const result = await this.clientService.getpendingappointments(user_id);
            return res.json({
                appoinments: result,
            })

        } catch (error) {
            return response_with_error(res, {
                statusCode: 400,
                message: 'Could not get client pending appointments',
                details: error instanceof Error ? error.message : error,
            })
        }
    }

    getacknowledgeappointments: RequestHandler = async (req, res) => {
        try {
            const user_id = Number(req.user?.sub);
            const result = await this.clientService.getacknowledgeappointments(user_id);
            return res.json({
                appoinments: result,
            })
        } catch (error) {
            return response_with_error(res, {
                statusCode: 400,
                message: 'Could not get client acknowledge appointments',
                details: error instanceof Error ? error.message : error,
            })
        }
    }
    // =============================== DAVID ===============================
}