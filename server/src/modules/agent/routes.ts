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
//helado
// POST /api/agent/properties
agentRouter.post(
    '/properties',
    [
        authMiddleware,
        requireRole(UserType.Agent),
        body('title').isString().notEmpty().withMessage('title is required'),
        body('type').isString().notEmpty().withMessage('type is required'),
        body('address').isString().notEmpty().withMessage('address is required'),
        body('zone').notEmpty().withMessage('zone is required'),
        body('price').isNumeric().withMessage('price must be a number'),
        body('num_rooms').isInt({ min: 0 }).withMessage('num_rooms must be a positive integer'),
        body('num_bathrooms').isInt({ min: 0 }).withMessage('num_bathrooms must be a positive integer'),
        body('square_meters').isNumeric().withMessage('square_meters must be a number'),
        body('state').isString().notEmpty().withMessage('state is required'),
        body('description').isString().notEmpty().withMessage('description is required'),
        body('images').isArray({ min: 1 }).withMessage('At least one image is required'),
        validateFields,
    ],
    controller.createProperty
)

// GET /api/agent/properties/:id
agentRouter.get(
    '/properties/:id',
    [
        authMiddleware,
        requireRole(UserType.Agent),
    ],
    controller.getPropertyById
)

// PUT /api/agent/properties/:id
agentRouter.put(
    '/properties/:id',
    [
        authMiddleware,
        requireRole(UserType.Agent),
        body('title').optional().isString().notEmpty().withMessage('title must be a non-empty string'),
        body('type').optional().isString().notEmpty().withMessage('type must be a non-empty string'),
        body('address').optional().isString().notEmpty().withMessage('address must be a non-empty string'),
        body('zone').optional().notEmpty().withMessage('zone must not be empty'),
        body('price').optional().isNumeric().withMessage('price must be a number'),
        body('num_rooms').optional().isInt({ min: 0 }).withMessage('num_rooms must be a positive integer'),
        body('num_bathrooms').optional().isInt({ min: 0 }).withMessage('num_bathrooms must be a positive integer'),
        body('square_meters').optional().isNumeric().withMessage('square_meters must be a number'),
        body('state').optional().isString().notEmpty().withMessage('state must be a non-empty string'),
        body('description').optional().isString().notEmpty().withMessage('description must be a non-empty string'),
        body('images').optional().isArray().withMessage('images must be an array'),
        validateFields,
    ],
    controller.updateProperty
)

// DELETE /api/agent/properties/:id
agentRouter.delete(
    '/properties/:id',
    [
        authMiddleware,
        requireRole(UserType.Agent),
    ],
    controller.deleteProperty
)

//fin helado

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


