// import users from '../mock-data/users.json' assert {type:'json'};

import { addUser, fetchAllUsers, fetchUser, updateUser } from "../models/user-model.mjs";


const getUser = async (req, res) => {
  const users = await fetchAllUsers();
  res.json(users);
}

const getUserById = async (req, res) => {
  console.log('user id', req.params.id);
  const result = await fetchUser(req.params.id);
  // const user = users.find((elememt) => elememt.user_id === parseInt(req.params.id));
  console.log(result);
  if (result) {
    if(result.error) {
      // serverilla on error
      res.status(500);
    }
    res.json(result);
  } else {
    res.status(404);
    res.json({message: "user not found"});
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

const postUser = async (req, res) => {
	console.log('request body', req.body);
  const {username, password, user_level_id, email} = req.body;
	if (username && password && user_level_id && email) {
    const newUser = {username, password, user_level_id, email};
    const result = await addUser(newUser);
    console.log('result', result);
    if (result) {
      if (result.error) {
        res.status(500).json({message: "error"});
        return;
      } 
      res.status(201).json({message: "New user added.", ...result});
      
    } else {
      res.status(400).json({message: "Missing data"});
    }
    }
		
}

const putUser = async (req, res) => {
  if (req.user) {
    const auth_user_id = req.user.user_id;
    const client_user_id = req.params.id;
    console.log('auth_user_id', auth_user_id);
    console.log('req user id', req.params.id);
    console.log('request body', req.body);
    // const username = 'hihi', password = '', email = '';
    if (parseInt(req.params.id) !== auth_user_id) {
      res.status(401).json({message: 'Wrong uer.'});
    } else {
      // if username password in used?
      const {username, password, email} = req.body;
      if (username || password || email) {
        const updatedUser = {username,password, email, auth_user_id, client_user_id};
        const result = await updateUser(updatedUser);
      if (result.error) {
        res.sendStatus(500);
      } 
      res.status(201).json({message: 'user updated.', ...result});
    } else {
      res.status(400).json({message: "missing data"});
    }
    }
    
  } else {
	  res.sendStatus(401);
	}
  
}

const deleteUser = (req, res) => {
  // if user with id exists, delete it, otherwise send 404
  console.log('user id', req.params.id);
  const userIndex = users.findIndex((elememt) => elememt.user_id === parseInt(req.params.id));
  console.log(userIndex);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(202).json({message: "user deleted"});
  } else {
    res.status(404).json({message: "user not found"});
  }
}

const getNumberOfUsers = (req, res) => {
  const quantity = users.length;
  res.json({message: "number of users", quantity: quantity});
}

export {getUser, getUserById, postUser, putUser, deleteUser, getNumberOfUsers}