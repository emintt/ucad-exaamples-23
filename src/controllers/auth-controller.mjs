import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { login } from "../models/user-model.mjs";

const postLogin = async (req, res) => {
	// TODO: use model to wuery sql for user info (username/pw)
	const user = await login(req.body);
	console.log('postLogin', req.body);
	try {
		// sign user to my secret chacracters
		const token = jwt.sign(user, process.env.JWT_SECRET);
		res.json({message: "logged in", token, user});
	} catch (error) {
		res.status(401).json({error});
	}
	
};

// k lähettää tokeni, mitä k tiedot sitä vastaan, onko token valid,
// haetaan tiedot 
const getMe = (req, res) => {
	console.log('getMe', req.user);
	res.json(req.user);
};


export {postLogin, getMe};