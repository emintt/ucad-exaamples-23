import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { login } from "../models/user-model.mjs";
import { validationResult } from 'express-validator';

const postLogin = async (req, res, next) => {
	// validation errors can be retrieved from the request object 
	//(added by express-validator middleware)
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		console.log(errors.array());
		// pass the error to the error handler middleware
		const error = new Error('invalid input fields');
		error.status = 400;
		return next(error);
	}
	const user = await login(req.body);
	console.log('postLogin', req.body);
	if (user.error) {
    return next(new Error(user.error));
  }
	try {
		// sign user to my secret chacracters
		const token = jwt.sign(user, process.env.JWT_SECRET);
		res.json({message: "logged in", token, user});
	} catch (error) {
		res.status(401).json({error});
	}
	
};

// käyttäjä lähettää tokeni, mitä käyttäjä tiedot sitä vastaan, onko token valid,
// haetaan tiedot 
const getMe = (req, res) => {
	console.log('getMe', req.user);
	res.json(req.user);
};


export {postLogin, getMe};