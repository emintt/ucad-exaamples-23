import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { login } from "../models/user-model.mjs";
import bcrypt from 'bcryptjs';

const postLogin = async (req, res, next) => {
	// TODO: input validation
	const user = await login(req.body.username);
	
	if (user.error) {
		return next(new Error(user.error));
	}
	// user is undefined (username not found in db)
	if (!user) {
		const error = new Error('username/password invalid');
		error.status = 401; 
		return next(error);
	}
	// db error in model
	console.log('postLogin', user);
	// user löytyy
	// match pw, true or false
	const match = await bcrypt.compare(req.body.password, user.password);

	if (match) {
		//poista pw ennen palautta
		user.delete(password);
		// sign user to my secret chacracters
		const token = jwt.sign(user, process.env.JWT_SECRET);
		res.json({message: "logged in", token, user});
	} else {
		// saalasana on väärin
		const error = new Error('username/password invalid');
		error.status = 401; 
		return next(error);
	}
	
};

// käyttäjä lähettää tokeni, mitä käyttäjä tiedot sitä vastaan, onko token valid,
// haetaan tiedot 
const getMe = (req, res) => {
	console.log('getMe', req.user);
	res.json(req.user);
};


export {postLogin, getMe};