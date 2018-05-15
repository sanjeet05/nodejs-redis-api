const express = require('express');
const router = express.Router();

// controller
const redisController = require('../controllers/redis.controller.v2');


//This is a simple route
router.get('/health-check', (req, res, next) =>
  res.send('OK')
);

router.route('/get_user_by_id')
  .post(redisController.getUserById);

router.route('/create_user')
  .post(redisController.createUser);

router.route('/delete_user_by_id')
  .post(redisController.deleteUserById);

router.route('/get_users')
  .post(redisController.getUsers);

module.exports = router;