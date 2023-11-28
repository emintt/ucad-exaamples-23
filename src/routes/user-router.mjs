import express from 'express';
import { deleteUser, getUser, getUserById, postUser, putUser } from '../controllers/user-controller.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';

const userRouter = express.Router();

// routes for user endpoint '/api/user/'
userRouter.route('/')
  .get(getUser)
	.post(postUser);
userRouter.route('/:id')
	.get(getUserById)
	.put(authenticateToken, putUser)
	.delete(deleteUser);

export default userRouter;
