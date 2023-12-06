import { validationResult } from "express-validator";
import { addMedia, deleteMediaItemById, fetchAllMedia, fetchMediaById, putMedia } from "../models/media-model.mjs";
import { error } from "console";



const getMedia = async (req, res, next) => {
  const mediaItems = await fetchAllMedia();
  res.json(mediaItems);
  if (mediaItems.error) {
    return next(new Error(mediaItems.error));
  }
}

const getMediaById = async (req, res, next) => {
  const result = await fetchMediaById(req.params.id);
  console.log('request params', req.params);
  // error handling for different scenarios
  console.log('getmediabyidresult', result);
  if (result) {
    if(result.error) {
      return next(new Error(result.error));
    }
    res.json(result);
  } else {
    const error = new Error('media item not found');
    error.status = 400;
    return next(error);
    // res.status(404).json({message: "media item not found", media_id: req.params.id});
  }
}

const postMediaItem = async(req, res, next) => {
  // check of file is rejected by multer
  if (!req.file) {
    const error = new Error('Invalid or missing file');
    error.status = 400;
    next(error);
    //return res.status(400).json({error: 'Invalid or missing file'})
  }
  // validationResult catch error from express validatormw
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
  // check xem co req.user ko, neu co thi la dang nhap
  // req.user is added by authenticateToken middleware
  if (req.user) {
	  console.log('req user', req.user);
    const user_id = req.user.user_id;
    console.log('media item id', req.params.id);
    console.log('request body', req.body);
    const media_id = req.params.id;
    // validationResult catch error from express validatormw
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      const error = new Error('finvalid input fileds');
      error.status = 400;
      return next(error);
      // return res.status(400).json({message: 'invalid input fields'});
    }
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
        const error = new Error('Wrong user.');
        error.status = 401;
        next(error);
      } else {
        res.status(200).json({message: 'Media item updated.', ...result});
      }
    } else {
      const error = new Error('Missing data');
      error.status = 400;
      next(error);
      // res.status(400).json({message: "missing data"});
    }
	} else {
    const error = new Error('unauthorized');
    error.status = 401;
    next(error);
	}

}


const deleteMediaItem = async (req, res, next) => {
  // check xem co req.user ko, neu co thi la dang nhap
  if (req.user) {
	  const user_id = req.user.user_id;
    console.log('user id', user_id);
    const result = await deleteMediaItemById(req.params.id, user_id);
    if (result) {
      if(result.error) {
        next(new Error(result.error));
      }
      if (result.affectedRows === 1) {
        res.status(202).json({message: "item deleted"});
      } else {
        const error = new Error('wrong user');
        error.status = 401;
        next(error);
      }
    } else {
      next(new Error('media item not found'));
      // res.status(404);
      // res.json({message: "media item not found", media_id: req.params.id});
    }
	} else {
	  res.sendStatus(401);
	}
}




export {getMedia, getMediaById, postMediaItem, putMediaItem, deleteMediaItem};
