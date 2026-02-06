import { RequestHandler } from 'express'
import * as service from './service.ts'


export const createUser: RequestHandler = async (req, res) => {
    try {
        await service.createUserFromDB()
        res.status(200).json({ message: "User created successfully" })
    } catch (error) {
        console.error(error)
    }
}

