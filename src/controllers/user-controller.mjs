import users from '../mock-data/users.json' assert {type:'json'};


const getUser = (req, res) => {
  res.json(users);
}

const getUserById = (req, res) => {
  console.log('user id', req.params.id);
  const user = users.find((elememt) => elememt.user_id === parseInt(req.params.id));
  console.log(user);
  if (user) {
   res.json(user);
  } else {
    res.status(404);
    res.json({message: "user not found"});
  }
}

const postUser = (req, res) => {
	console.log('request body', req.body);
	// check id of the last item in items and add 1   
	const newId = users[users.length-1].user_id + 1;
	if (req.body.username && req.body.password && req.body.user_level_id && req.body.email) {
		users.push({
			user_id: newId,
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			user_level_id: req.body.user_level_id,
			created_at: new Date(Date.now()).toISOString()
		});
		res.status(201).json({message: "New user added."});
	} else {
		res.status(400).json({message: "Missing data"});
	}
}

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