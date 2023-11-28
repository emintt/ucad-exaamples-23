import { addMedia, deleteMediaItemById, fetchAllMedia, fetchMediaById, putMedia } from "../models/media-model.mjs";



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
const postMediaItem = async (req, res, next) => {
  //console.log('uploaded file', req.file);
  //console.log('uploaded form data', req.body);
  if (!req.file) {
    const error = new Error('file missing or invalid');
    error.status = 400;
    return next(error);
  }
  // req.file, req.body added by multer, file: info about file upload
  const {title, description, user_id} = req.body;
  const {filename, mimetype, size} = req.file;
  if (filename && title && user_id) {
    // TODO: add error handling when database error occurs
    const newMedia = {title, description, user_id, filename, mimetype, size};
    const result = await addMedia(newMedia);
    res.status(201);
    res.json({message: 'New media item added.', ...result});
  } else {
    res.sendStatus(400);
  }
};

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
  
  
  
  // console.log('media item id', req.params.id);
  // const itemIndex = mediaItems.findIndex((elememt) => elememt.media_id === parseInt(req.params.id));
  // console.log(itemIndex);
  // if (itemIndex !== -1) {
  //   mediaItems.splice(itemIndex, 1);
  //   res.status(202).json({message: "item deleted"});
  // } else {
  //   res.status(404).json({message: "item not found"});
  // }
}



export {getMedia, getMediaById, postMediaItem, putMediaItem, deleteMediaItem};