import { validationResult } from "express-validator";
import { addMedia, deleteMediaItemById, fetchAllMedia, fetchMediaById } from "../models/media-model.mjs";



const getMedia = async (req, res) => {
  const mediaItems = await fetchAllMedia();
  res.json(mediaItems);
}

const getMediaById = async (req, res) => {
  const result = await fetchMediaById(req.params.id);
  console.log('request params', req.params);
  // error handling for different scenarios
  if (result) {
    if(result.error) {
      // serverilla on error
      res.status(500);
    }
    res.json(result);
  } else {
    res.status(404);
    res.json({message: "media item not found", media_id: req.params.id});
  }
}

const postMediaItem = async(req, res, next) => {
  // validationResult catch error from express validators
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    const error = new Error('finvalid input fileds'); 
    error.status = 400;
    return next(error);
    // return res.status(400).json({message: 'invalid input fields'});
  }
  // da validate r, biet chac la no co?
  const {title, description} = req.body;
  const {filename, mimetype, size} = req.file;
  // req.user is added by authenticateToken middleware
  const user_id = req.user.user_id;
  const newMedia = {title, description, user_id, filename, mimetype, size};
  const result = await addMedia(newMedia);
  if (result.error) {
    return next(new Error(result.error));
  }
  res.status(201).json({message: "New item added.", ...result});

}

const putMediaItem = async(req, res, next) => {
  if (req.user) {
	  console.log('req user', req.user);
    const user_id = req.user.user_id;
    console.log('media item id', req.params.id);
    console.log('request body', req.body);
    const media_id = req.params.id;
    const {title, description} = req.body;
    console.log(req.file);
    const filename = '', mimetype = '', size = '';
    if (req.file) {
      const {filename, mimetype, size} = req.file;
    }
    if (title || description || filename || mimetype || size) {
      const updatedMedia = {media_id,title, description, filename, mimetype, size, user_id};
      const result = await putMedia(updatedMedia);
      const affectedRows = result["0"].affectedRows;
      if (affectedRows === 0) {
        res.status(401).json({message: 'Wrong uer.'});
      } else {
        res.status(401).json({message: 'Media item updated.', ...result});
      }
    } else {
      res.status(400).json({message: "missing data"});
    }
	} else {
	  res.sendStatus(401);
	}
  
}


const deleteMediaItem = async (req, res) => {
  // check xem co req.user ko, neu co thi la dang nhap
  if (req.user) {
	  const user_id = req.user.user_id;
    console.log('user id', user_id);
    const result = await deleteMediaItemById(req.params.id, user_id);
    if (result) {
      if(result.error) {
        // serverilla on error
        res.status(500);
      }
      if (result.affectedRows === 1) {
        res.status(202).json({message: "item deleted"});
      } else {
        res.status(401).json({message: "wrong user"});
      }
    } else {
      res.status(404);
      res.json({message: "media item not found", media_id: req.params.id});
    }
	} else {
	  res.sendStatus(401);
	}
}




export {getMedia, getMediaById, postMediaItem, putMediaItem, deleteMediaItem};