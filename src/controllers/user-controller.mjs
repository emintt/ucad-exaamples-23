
import { validationResult } from "express-validator";
import { addUser, fetchAllUsers, fetchUser } from "../models/user-model.mjs";
import bcrypt from 'bcryptjs';


const postUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // details about errors:
    console.log(errors.array())
    return res.status(400).json({message: 'invalid input fields'});
  }
  const newUser = req.body;
  const salt = await bcrypt.genSalt(10);
  const hassedPassword = await(bcrypt.hash(newUser.password, salt));
  console.log('post user', newUser);
    // korvataan password
    newUser.password = hassedPassword;
   const newUserId = await(addUser(newUser));

  // hashedPassword : password (on jälkeen kun validatori läpi)
  res.status(201).json({message: 'user added', user_id: newUserId});
};

// const postUser = async (req, res) => {
//   const errors = validationResult(req);
//   if(!errors.isEmpty()) {
//     console.log(errors.array());
//     return res.status(400).json({message: 'invalid input fields'});
//   }
//   const newUserId = await addUser(req.body);
//   res.json({message: 'user added', user_id: newUserId});
// }

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

// const postUser = async (req, res) => {
// 	console.log('request body', req.body);
//   const {username, password, user_level_id, email} = req.body;
// 	if (username && password && user_level_id && email) {
//     const newUser = {username, password, user_level_id, email};
//     const result = await addUser(newUser);
//     console.log('result', result);
//     if (result) {
//       if (result.error) {
//         res.status(500).json({message: "error"});
//         return;
//       } 
//       res.status(201).json({message: "New user added.", ...result});
      
//     } else {
//       res.status(400).json({message: "Missing data"});
//     }
//     }
		
// }

const putUser = (req, res) => {
  console.log('user id', req.params.id);
  console.log('request body', req.body);
  const user = users.find((element) => element.user_id === parseInt(req.params.id));
  // check if request body valid
  // if user exists, edit it, otherwise send 404 
  if (req.body.user_id || req.body.username || req.body.password || req.body.email
    || req.body.user_level_id) {
    if (user) {
      user.username = req.body?.username ?? user.username,
      user.password = req.body?.password ?? user.password,
      user.email = req.body?.email ?? user.email,
      user.user_level_id = req.body?.user_level_id ?? user.user_level_id,
      user.created_at = user.created_at,

      res.json({message: "user updated"});
    } else {
      res.status(404).json({message: "user not found"});
    }  
  } else {
    res.status(400).json({message: "missing data"});
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