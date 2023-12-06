import express from "express";
// import multer from 'multer';
import {
	deleteMediaItem,
	getMedia,
	getMediaById,
	postMediaItem,
	putMediaItem }
from "../controllers/media-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";
import upload from "../middlewares/upload.mjs";
import { body } from "express-validator";

const mediaRouter = express.Router();
// upload folder destination is relative to pkg.json
// const upload = multer({ dest: 'uploads/'}); -> upload config now in mw upload.mjs

/**
 * @api {get} /media Get all media items
 * @apiVersion 1.0.0
 * @apiName GetMedia
 * @apiGroup Media
 * @apiPermission all
 *
 * @apiSuccess {Object[]} data List of media items.
 * @apiSuccess {Number} media_id Id of the media.
 * @apiSuccess {Number} user_id Id of the User.
 * @apiSuccess {String} filename Name of media file.
 * @apiSuccess {String} filesize Size of media file.
 * @apiSuccess {String} media_type type of the media file.
 * @apiSuccess {Number} title Title of media item.
 * @apiSuccess {Number} created_at Token creation timestamp.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
        "media_id": 1,
        "user_id": 1,
        "filename": "sunset.jpg",
        "filesize": 1024,
        "media_type": "image/jpeg",
        "title": "ne",
        "description": "description updated 111",
        "created_at": "2023-11-21T21:44:05.000Z"
        }]
 *
 * @apiUse InternalServerError
 */

/**
 * @api {post} /media Create new media item
 * @apiVersion 1.0.0
 * @apiName PostMediaItem
 * @apiGroup Media
 * @apiPermission token
 *
 * @apiDescription Create a new media item.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {File} file The file to be uploaded.
 * @apiParam {String} title Title of media item.
 * @apiParam {String} decription Description of media item.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "file": "pic1.jpg",
 *      "title": "sunset",
 *      "description": "sunset"
 *    }
 *
 * @apiSuccess {Object} data  object containing success message.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *      {
          "message": "new item added",
        }
 *
 * @apiUse Error400
 * @apiUse UnauthorizedError

 */
// routes for /api/media
mediaRouter.route('/')
	.get(getMedia)
	// form käsittelyn varten (multer), multer palauttaa req.body, req.file
	// req.body on olemassa sen jälkeen kun käyttä multer
	.post(
		authenticateToken,
		upload.single('file'),
		body('title').trim().isLength({min: 3, max: 50}),
		body('description').optional().isLength({max: 255}),
		body('file'),
		postMediaItem);

/**
 * @api {get} /media/:id Get media by id
 * @apiVersion 1.0.0
 * @apiName GetMediaById
 * @apiGroup Media
 * @apiPermission all
 *
 * @apiSuccess {Object} data Media item info.
 * @apiSuccess {Number} media_id Id of the media.
 * @apiSuccess {Number} user_id Id of the User.
 * @apiSuccess {String} filename Name of media file.
 * @apiSuccess {String} filesize Size of media file.
 * @apiSuccess {String} media_type type of the media file.
 * @apiSuccess {Number} title Title of media item.
 * @apiSuccess {Number} created_at Token creation timestamp.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
        "media_id": 1,
        "user_id": 1,
        "filename": "sunset.jpg",
        "filesize": 1024,
        "media_type": "image/jpeg",
        "title": "ne",
        "description": "description updated 111",
        "created_at": "2023-11-21T21:44:05.000Z"
        }
 *
 * @apiUse InternalServerError
 * @apiUse NotFoundError
 */

/**
 * @api {put} /media/:id Update a media item
 * @apiVersion 1.0.0
 * @apiName PutMediaItemById
 * @apiGroup Media
 * @apiPermission token
 *
 * @apiDescription Update an existing media item.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {File} file optional The file to be uploaded.
 * @apiParam {String} title optional Title of media item.
 * @apiParam {String} decription optional Description of media item.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "file": "pic1.jpg",
 *      "title": "sunset",
 *    }
 *
 * @apiSuccess {Object} data Media item object containing success message.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
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
         "message": "Media item updated."
        }
 *
 * @apiUse Error400
 * @apiUse UnauthorizedError

 */
mediaRouter.route('/:id')
	.get(getMediaById)
	.put(
		authenticateToken,
		upload.single('file'),
		body('title').optional().trim().isLength({min: 3, max: 50}),
		body('description').optional().isLength({max: 255}),
		body('file').optional(),
		putMediaItem)
	.delete(deleteMediaItem);
export default mediaRouter;
