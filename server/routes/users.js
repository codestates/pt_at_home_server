const express = require('express');
const router = express.Router();
const {usersController} =require('../controllers')

/* GET users listing. */
router.post('/resign', usersController.resign);
router.post('/update', usersController.update);
router.get('/signout', usersController.signout);
router.post('/signin', usersController.signin);
router.post('/signup', usersController.signup);
router.post('/token', usersController.token);


module.exports = router;
