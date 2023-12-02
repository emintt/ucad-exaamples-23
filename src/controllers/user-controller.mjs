
import { validationResult } from "express-validator";
import { addUser, fetchAllUsers, fetchUser, updateUser } from "../models/user-model.mjs";


const postUser = async (req, res, next) => {
  // validation errors can be retrieved from the request object 
  //(added by express-validator middleware)
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    // pass the error to the error handler middleware
    const error = new Error('invalid input fields');
    error.status = 400;
    return next(error);
  }
  const newUserId = await addUser(req.body);
  // jos tietokannassta tulee errori (default on 500, ei tarvitse kirjoittaa tähän)
  if (newUserId.error) {
    return next(new Error(newUserId.error));
  }
  res.json({message: 'user added', user_id: newUserId});
}

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
      next(new Error(result.error));
    }
    res.json(result);
  } else {
    const error = new Error('user not found');
    error.status = 404;
    return next(error);
    // res.status(404);
    // res.json({message: "user not found"});
  }
}

const putUser = async (req, res, next) => {
  // logged user 
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
       // validationResult catch error from express validatormw
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        const error = new Error('finvalid input fileds'); 
        error.status = 400;
        return next(error);
        // return res.status(400).json({message: 'invalid input fields'});
      }
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

//       res.json({message: "user updated"});
//     } else {
//       res.status(404).json({message: "user not found"});
//     }  
//   } else {
//     res.status(400).json({message: "missing data"});
//   }
// }

// const deleteUser = (req, res) => {
//   // if user with id exists, delete it, otherwise send 404
//   console.log('user id', req.params.id);
//   const userIndex = users.findIndex((elememt) => elememt.user_id === parseInt(req.params.id));
//   console.log(userIndex);
//   if (userIndex !== -1) {
//     users.splice(userIndex, 1);
//     res.status(202).json({message: "user deleted"});
//   } else {
//     res.status(404).json({message: "user not found"});
//   }
// }



export {getUser, getUserById, postUser, putUser}