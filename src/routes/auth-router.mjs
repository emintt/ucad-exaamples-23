import express from 'express';
import { getMe, postLogin } from '../controllers/auth-controller.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';
import { body } from 'express-validator';

const authRouter = express.Router();

/**
 * @apiDefine all No authentication needed.
 */

/**
 * @apiDefine admin Admin user level token needed.
 */

/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 */

/**
 * @apiDefine UnauthorizedError
 * @apiError UnauthorizedError User name or password invalid.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": {
 *         "message": "username/password invalid",
 *         "status": 401
 *       }
 *     }
 */
/**
 * @apiDefine NotFoundError
 * @apiError NotFoundError Not found message.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not found
 *    {
 *      "error": {
 *        "message": "Not Found - /api/usersa",
 *        "status": 404
 *      }
 *    }
 */
/**
 * @apiDefine InternalServerError
 * @apiError InternalServerError Internal server error message.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500
 *    {
 *      "error": {
 *        "message": "error message from server",
 *        "status": 500
 *      }
 *    }
 */

/**
 * @apiDefine Error400
 * @apiError Error400 Error message.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400
 *    {
 *      "error": {
 *        "message": "error message",
 *        "status": 400
 *      }
 *    }
 */

/**
 * @api {post} /login Login
 * @apiVersion 1.0.0
 * @apiName PostLogin
 * @apiGroup Authentication
 * @apiPermission all
 *
 * @apiDescription Sign in and get an authentication token for the user.
 *
 * @apiParam {String} username Username of the user.
 * @apiParam {String} password Password of the user.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "username": "johnd",
 *      "password": "examplepass"
 *    }
 *
 * @apiSuccess {String} token Token for the user authentication.
 * @apiSuccess {Object} user User info.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Logged in successfully",
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwid
 *                XNlcm5hbWUiOiJ1dXNpMSIsImVtYWlsIjoidXVzaTFAZXhhbXBsZS5jb20
 *                iLCJ1c2VyX2xldmVsX2lkIjoyLCJpYXQiOjE3MDEyNzkzMjJ9.3TbVTcXS
 *                dryTDm_huuXC_U1Lg4rL0SOFyn_WAsC6W0Y"
 *      "user": {
 *        "user_id": 21,
 *        "username": "johnd",
 *        "email": "johnd@example.com",
 *        "user_level_id": 2
 *      }
 *    }
 *
 * @apiUse UnauthorizedError
 */
// route for /api/auth/
authRouter.route('/login')
  .post(
		body('username').trim().isLength({min: 3, max:20}).isAlphanumeric(),
		body('password').trim().isLength({min: 8}),
		postLogin);

/**
 * @api {get} /auth/me Request information about current user
 * @apiVersion 1.0.0
 * @apiName GetMe
 * @apiGroup Authentication
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object} user User info.
 * @apiSuccess {Number} user.user_id Id of the User.
 * @apiSuccess {String} user.username Username of the User.
 * @apiSuccess {String} user.email email of the User.
 * @apiSuccess {Number} user.user_level_id User level id of the User.
 * @apiSuccess {Number} user.iat Token creation timestamp.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": 21,
 *       "username": "johnd",
 *       "email": "johnd@example.com",
 *       "user_level_id": 2,
 *       "iat": 1701279021
 *     }
 *
 * @apiError InvalidToken Authentication token was invalid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "invalid token"
 *     }
 */
authRouter.route('/me').get(authenticateToken, getMe);




export default authRouter;
