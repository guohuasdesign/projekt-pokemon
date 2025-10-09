import { Router } from "express";
import {
	getUsers,
	createUser,
	getUserById,
	updateUser,
	deleteUser
} from '../controllers/index.ts';

import { validateZod } from '../middleware/index.ts';
import { userInputSchema, paramsSchema } from '../schemas/index.ts';

const userRouter = Router();

userRouter
	.route('/')
	.get(getUsers)
	.post(validateZod(userInputSchema, 'body'), createUser);

userRouter.use('/:id', validateZod(paramsSchema, 'params'));
userRouter
	.route('/:id')
	.get(getUserById)
	.put(validateZod(userInputSchema, 'body'), updateUser)
	.delete(deleteUser);

export default userRouter; 