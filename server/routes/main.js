const express = require('express');
const router = express.Router();
const {mainController} =require('../controllers')

/* GET users listing. */
router.get('/', mainController.main);
router.post('/filter', mainController.filter);
router.post('/search', mainController.search);
router.get('/routine', mainController.routine);


module.exports = router;
