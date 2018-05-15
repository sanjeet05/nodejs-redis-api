const client = require('../redis/index').client;

// {
// 	"id": "user001"
// }

// get user
const getUserById = (req, res, next) => {
  let id = req.body.id;

  client.hgetall(id, function(err, obj){
    if(!obj){
      res.json({message: 'User does not exist'});      
    } else {
      obj.id = id;      
      res.json({user: obj});
    }
  });
};

// {
// 	"id": "user001",
// 	"first_name":"Sanjeet",
// 	"last_name": "Kumar",
// 	"email": "sanjeet@gmail.com",
// 	"phone": "999999999"
// }

// Add user
const createUser = (req, res, next) => {
  let id = req.body.id;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  let phone = req.body.phone;

  client.hmset(id, [
    'first_name', first_name,
    'last_name', last_name,
    'email', email,
    'phone', phone
  ], function(err, reply){
    if(err){
      console.log(err);
    }
    console.log(reply);
    res.json({message: 'User has been added'});
  });
};

// {
// 	"id": "user001"
// }

// Delete User
const deleteUserById = (req, res, next) => {
  let id = req.body.id;
  client.del(id);
  res.json({message: 'User has been deleted'});
};

module.exports = {
  getUserById,
  createUser,
  deleteUserById,
};
