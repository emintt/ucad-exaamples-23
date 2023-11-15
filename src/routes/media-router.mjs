import express from "express";
import multer from 'multer';
import { deleteMediaItem, getMedia, getMediaById, postMediaItem, putMediaItem } from "../controllers/media-controller.mjs";

const mediaRouter = express.Router();
// upload folder destination is relative to pkg.json
const upload = multer({ dest: 'uploads/'});
mediaRouter.route('/')
	.get(getMedia)
	.post(upload.single('file'), postMediaItem);
mediaRouter.route('/:id')
	.get(getMediaById)
	.put(putMediaItem)
	.delete(deleteMediaItem);

// app.delete('/api/media/:id', deleteMediaItem); -> tää on mitä meillä oli

export default mediaRouter;