import { Router } from 'express'
import { body } from 'express-validator'

import { ClientController } from './controller.ts'
import { authMiddleware } from '../../middleware/auth.ts'
import { requireRole } from '../../middleware/require-role.ts'
import { validateFields } from '../../middleware/validate-fields.ts'
import { UserType } from '../../store/enums.ts'

const clientRouter = Router()
const clientController = new ClientController()

// GET /api/client/profile
clientRouter.get(
	'/profile',
	[
		authMiddleware,
		requireRole(UserType.Client),
	],
	clientController.profileClient,
)

export default clientRouter