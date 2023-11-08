const mediaItems = [
    {
      media_id: 9632,
      filename: "ffd8.jpg",
      filesize: 887574,
      title: "Favorite drink",
      description: "",
      user_id: 1606,
      media_type: "image/jpeg",
      created_at: "2023-10-16T19:00:09.000Z"
    },
    {
      media_id: 9626,
      filename: "dbbd.jpg",
      filesize: 60703,
      title: "Miika",
      description: "My Photo",
      user_id: 3671,
      media_type: "image/jpeg",
      created_at: "2023-10-13T12:14:26.000Z"
    },
    {
      media_id: 9625,
      filename: "2f9b.jpg",
      filesize: 30635,
      title: "Aksux",
      description: "friends",
      user_id: 260,
      media_type: "image/jpeg",
      created_at: "2023-10-12T20:03:08.000Z"
    },
    {
      media_id: 9592,
      filename: "f504.jpg",
      filesize: 48975,
      title: "Desert",
      description: "",
      user_id: 3609,
      media_type: "image/jpeg",
      created_at: "2023-10-12T06:59:05.000Z"
    },
    {
      media_id: 9590,
      filename: "60ac.jpg",
      filesize: 23829,
      title: "Basement",
      description: "Light setup in basement",
      user_id: 305,
      media_type: "image/jpeg",
      created_at: "2023-10-12T06:56:41.000Z"
    }
  ];


const getMedia = (req, res) => {
  res.json(mediaItems);
}

const getMediaById = (req, res) => {
  console.log('media id', req.params.id);
  const mediaItem = mediaItems.find((elememt) => elememt.media_id === parseInt(req.params.id));
  console.log(mediaItem);
  if (mediaItem) {
    res.json(mediaItem);
  } else {
    res.status(404);
    res.json({message: "media item not found"});
  }
}

const postMediaItem = (req, res) => {
  console.log('request body', req.body);
  // check id of the last item in items and add 1   
  const newId = mediaItems[mediaItems.length-1].media_id + 1;
  if (req.body.user_id && req.body.filename && req.body.title && req.body.description
    && req.body.media_type) {
    mediaItems.push({
      media_id: newId, 
      filename: req.body.filename,
      filesize: req.body.filesize,
      title: req.body.title,
      description: req.body.description,
      user_id: req.body.user_id,
      media_type: req.body.media_type,
      created_at: new Date(Date.now()).toISOString(),
    });
    res.status(201).json({message: "New item added."});
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

const deleteMediaItem = (req, res) => {
  // if item with id exists, delete it, otherwise send 404
  console.log('media item id', req.params.id);
  const itemIndex = mediaItems.findIndex((elememt) => elememt.media_id === parseInt(req.params.id));
  console.log(itemIndex);
  if (itemIndex !== -1) {
    mediaItems.splice(itemIndex, 1);
    res.status(202).json({message: "item deleted"});
  } else {
    res.status(404).json({message: "item not found"});
  }
}


const staticMediaItem = mediaItems[1];

export {getMedia, getMediaById, postMediaItem, putMediaItem, deleteMediaItem, staticMediaItem};