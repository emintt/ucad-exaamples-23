import express from "express";
import { deleteMediaItem, getMedia, getMediaById, postMediaItem, putMediaItem } from "../controllers/media-controller.mjs";

const mediaRouter = express.Router();

mediaRouter.route('/')
	.get(getMedia)
	.post(postMediaItem);
mediaRouter.route('/:id')
	.get(getMediaById)
	.put(putMediaItem)
	.delete(deleteMediaItem);

// app.delete('/api/media/:id', deleteMediaItem); -> tää on mitä meillä oli

export default mediaRouter;