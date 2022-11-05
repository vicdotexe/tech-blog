const express = require('express');
const router = express.Router();

// controllers linked in through index.js from api folder

// const tempController1 = require('./tempController1')
// router.use('/temp1', tempController1);

// const tempController2 = require('./tempController2')
// router.use('/temp2', tempController2)

const usersController = require('./usersController');
router.use('/users', usersController)

const postsController = require('./postsController');
router.use('/posts', postsController)

const commentsController = require('./commentsController');
router.use('/comments', commentsController)

module.exports = router;