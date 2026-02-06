import { Router } from 'express'
import * as controller from './controller.ts'


const authRouter = Router()

authRouter.get('/register',
    // Falta validar la entrada del req
    // Falta el middleware para express-validator
    controller.createUser
)


export default authRouter