import { Router } from "express";
import { body } from 'express-validator'
import * as controller from './controller.ts'
import { validateFields } from '../../middleware/validate-fields.ts'
import { authMiddleware } from '../../middleware/auth.ts'
import { requireRole } from "../../middleware/require-role.ts";
import { UserType } from "../../store/enums.ts";

export const agentRouter = Router();

agentRouter.get('/dashboard',
    [
        authMiddleware,
        requireRole(UserType.Agent),
    ],
    controller.getStats
)

agentRouter.post('/filter',
    [
        authMiddleware,
        requireRole(UserType.Agent),
        body('title').isString().optional(),
        body('type').isString().optional(),
        body('price').isNumeric().optional(),
        body('rooms').isNumeric().optional(),
        body('meter').isNumeric().optional(),
        body('bathrooms').isNumeric().optional(),
        body('is_ascendent_price').isBoolean().optional(),
        body('is_ascendent_title').isBoolean().optional(),
        validateFields
    ],
    controller.filter
)


