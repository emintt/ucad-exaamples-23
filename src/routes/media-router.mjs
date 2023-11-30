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
 

// TODO: check and authentication where needed
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
mediaRouter.route('/:id')
	.get(getMediaById)
	.put(putMediaItem)
	.delete(deleteMediaItem);
export default mediaRouter;