const client = require('../redis/index').client;

// {
// 	"id": "1"
// }

// get user
const getUserById = (req, res, next) => {
  let id = 'user:'+req.body.id;

  client.hgetall(id, function(err, obj){
    if(!obj){
      res.json({message: 'User does not exist'});      
    } else {
      obj.id = req.body.id;      
      res.json({user: obj});
    }
  });
};

// { 	
// 	"first_name":"Sanjeet",
// 	"last_name": "Kumar",
// 	"email": "sanjeet@gmail.com",
// 	"phone": "999999999"
// }

// Add user
const createUser = (req, res, next) => {
  // get new user id  
  client.incr('user:id', (err, userId) => {
    // console.log('UserId', userId);
    let id = 'user:'+userId;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let phone = req.body.phone;
      
    client.multi()
      .hmset(id, [
        'first_name', first_name,
        'last_name', last_name,
        'email', email,
        'phone', phone
      ])      
      .zadd('users', Date.now(), userId)
      .exec(function(err, reply){
        if(err){
          console.log(err);
        }
        // console.log(reply);
        res.json({message: 'User has been added'});
      });
  });
  
};

// {
// 	"id": "1"
// }

// Delete User
const deleteUserById = (req, res, next) => {
  let id = 'user:'+req.body.id;
  client.del(id);
  res.json({message: 'User has been deleted'});
};

// get user list
const getUsers = (req, res, next) => {
  
  let promise = new Promise((resolve, reject) => {
    client.zrange('users', 0, -1, function(err, data){
      // will get list of ids
      // console.log(data);
      let users = []; 
      let loopsleft = data.length;   
      data.forEach(function(userId){
        let id = 'user:'+userId;
        client.hgetall(id, function(err, obj){
          if(!obj){
            res.json({message: 'User does not exist'});      
          } else {
            obj.id = userId; 
            users.push(obj);
            // console.log('user',obj);
            loopsleft--;
            if(loopsleft === 0){
               resolve(users);
            }
          }
        });       
      });  
      
    });
  });

  promise.then( users => {
    // console.log('res', users);
    res.json({user: users});
  });
  
};

module.exports = {
  getUserById,
  createUser,
  deleteUserById,
  getUsers,
};
