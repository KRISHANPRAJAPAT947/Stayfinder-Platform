const express = require('express');
const homesController = require('../controllers/homes');

const userRouter  = express.Router();

userRouter.get("/" ,homesController.getHomes);

module.exports = userRouter;