import express from 'express';
import {getUser, getUserById, postUser, putUser} from '../controllers/user-controller.mjs';
import { body } from 'express-validator';
import { authenticateToken } from '../middlewares/authentication.mjs';

const userRouter = express.Router();

/**
 * @api {get} /users Get all users
 * @apiVersion 1.0.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission all
 *
 * @apiSuccess {Object[]} List of users.
 * @apiSuccess {Number} user.user_id Id of the User.
 * @apiSuccess {String} user.username Username of the User.
 * @apiSuccess {String} user.password Password of the User.
 * @apiSuccess {String} user.email email of the User.
 * @apiSuccess {Number} user.user_level_id User level id of the User.
 * @apiSuccess {Number} user.iat Token creation timestamp.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *        "user_id": 1,
          "username": "Marwe22e2stti21",
          "password": "st2222222h",
          "email": "1234dehvw22eh2vjh5@hmail.com",
          "user_level_id": 2,
          "created_at": "2023-11-21T21:44:05.000Z"
 *     }]
 *
 * @apiUse InternalServerError
 */

/**
 * @api {post} /users Create user
 * @apiVersion 1.0.0
 * @apiName PostUser
 * @apiGroup User
 * @apiPermission all
 *
 * @apiDescription Create a new user.
 *
 * @apiParam {String} username Username of the user.
 * @apiParam {String} password Password of the user.
 * @apiParam {String} email Email of the user.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "username": "johnd",
 *      "password": "examplepass",
 *      "email": "abc@add.jjs"
 *    }
 *
 * @apiSuccess {Object} data User object containing user id and message.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *      {
          "message": "user added",
          "user_id": 46
        }
 *
 * @apiUse Error400
 */
// routes for /api/users
userRouter.route('/')
  .get(getUser)
	.post(
		body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
		postUser);


/**
 * @api {get} /users/:id Get user by id
 * @apiVersion 1.0.0
 * @apiName GetUserById
 * @apiGroup User
 * @apiPermission all
 *
 * @apiParam {Number} id User id.
 *
 * @apiSuccess {Object} data User info.
 * @apiSuccess {Number} user.user_id Id of the User.
 * @apiSuccess {String} user.username Username of the User.
 * @apiSuccess {String} user.password Password of the User.
 * @apiSuccess {String} user.email email of the User.
 * @apiSuccess {Number} user.user_level_id User level id of the User.
 * @apiSuccess {Number} user.iat Token creation timestamp.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "user_id": 1,
          "username": "Marwe22e2stti21",
          "password": "st2222222h",
          "email": "1234dehvw22eh2vjh5@hmail.com",
          "user_level_id": 2,
          "created_at": "2023-11-21T21:44:05.000Z"
 *     }
 *
 * @apiUse InternalServerError
 * @apiUse NotFoundError
 */

/**
 * @api {put} /users/:id Update user
 * @apiVersion 1.0.0
 * @apiName update user info
 * @apiGroup User
 * @apiPermission all
 *
 * @apiDescription Update a user info.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {String} username Username of the user.
 * @apiParam {String} password Password of the user.
 * @apiParam {String} email Email of the user.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "username": "johnd",
 *      "password": "examplepass",
 *      "email": "abc@add.jjs"
 *    }
 *
 * @apiSuccess {Object} data User object containing user id and message.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *      {
          "0": {
               "fieldCount": 0,
               "affectedRows": 1,
               "insertId": 0,
               "info": "Rows matched: 1  Changed: 1  Warnings: 0",
               "serverStatus": 2,
               "warningStatus": 0,
               "changedRows": 1
           },
           "message": "user updated."
        }
 *
 * @apiUse Error400
 * @apiUse UnauthorizedError
 */
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
