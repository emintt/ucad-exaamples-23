import express from "express";
import multer from 'multer';
import { 
	deleteMediaItem, 
	getMedia, 
	getMediaById, 
	postMediaItem, 
	putMediaItem } 
from "../controllers/media-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";

const mediaRouter = express.Router();
// upload folder destination is relative to pkg.json
const upload = multer({ dest: 'uploads/'});
// routes for /api/media/
mediaRouter.route('/')
	.get(getMedia)
	.post(upload.single('file'), postMediaItem);
mediaRouter.route('/:id')
	.get(getMediaById)
	.put(authenticateToken, upload.single('file'), putMediaItem)
	.delete(authenticateToken, deleteMediaItem);
export default mediaRouter;