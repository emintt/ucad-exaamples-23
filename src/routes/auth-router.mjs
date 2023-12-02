import express from 'express';
import { getMe, postLogin } from '../controllers/auth-controller.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';
import { body } from 'express-validator';

const authRouter = express.Router();

// route for /api/auth/
authRouter.route('/login')
  .post(
		body('username').trim().isLength({min: 3, max:20}).isAlphanumeric(), 
		body('password').trim().isLength({min: 8}),
		postLogin);
authRouter.route('/me').get(authenticateToken, getMe);



 
export default authRouter;
