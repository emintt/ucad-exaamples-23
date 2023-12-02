import express from 'express';
import {getUser, getUserById, postUser, putUser} from '../controllers/user-controller.mjs';
import { body } from 'express-validator';
import { authenticateToken } from '../middlewares/authentication.mjs';

const userRouter = express.Router();

// routes for /api/users
userRouter.route('/')
  .get(getUser)
	.post(
		body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
		postUser);
userRouter.route('/:id')
	.get(getUserById)
	.put(
		authenticateToken, 
		body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
		putUser)
	// .delete(deleteUser)
	;

export default userRouter;
