import { deleteMediaItemById, fetchAllMedia, fetchMediaById } from "../models/media-model.mjs";



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

const postMediaItem = async(req, res) => {
  console.log('uploaded file', req.file);
  console.log('uploaded form data', req.body);
  const {title, description, user_id} = req.body;
  const {filename, mimetype, size} = req.file;
  // check id of the last item in items and add 1   
  // const newId = mediaItems[0].media_id + 1;
  if (user_id && filename && title) {
    const newMedia = [title, description, user_id, filename, mimetype, size];
    const result = await addMedia(newMedia);
    res.status(201).json({message: "New item added.", ...result});
  } else {
    res.status(400).json({message: "Missing data"});
  }
}

const putMediaItem = (req, res) => {
  console.log('media item id', req.params.id);
  console.log('request body', req.body);
  const item = mediaItems.find((element) => element.media_id === parseInt(req.params.id));
  // check if request body valid
  // if item exists, edit it, otherwise send 404 
  if (req.body.user_id || req.body.filename || req.body.title || req.body.description
    || req.body.media_type) {
    if (item) {
      item.filename = req.body?.filename ?? item.filename,
      item.filesize = req.body?.filesize ?? item.filesize,
      item.title = req.body?.title ?? item.title,
      item.description = req.body?.description ?? item.description,
      item.user_id = req.body?.user_id ?? item.user_id,
      item.media_type = req.body?.media_type ?? item.media_type,
      item.created_at = item.created_at,

      res.json({message: "item updated"});
    } else {
      res.status(404).json({message: "item not found"});
    }  
  } else {
    res.status(400).json({message: "missing data"});
  }
}

const deleteMediaItem = async (req, res) => {
  const result = await deleteMediaItemById(req.params.id);
  // if item with id exists, delete it, otherwise send 404
  if (result) {
    if(result.error) {
      // serverilla on error
      res.status(500);
    }
    if (result === 1) {
      res.status(202).json({message: "item deleted"});
    }
  } else {
    res.status(404);
    res.json({message: "media item not found", media_id: req.params.id});
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