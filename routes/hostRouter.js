const express = require('express');
const path = require('path');
const homesController = require('../controllers/homes');

const hostRouter  = express.Router();
const rootDir = require('../utils/pathUtil');

hostRouter.get("/host/add-home" , homesController.getAddhome);

hostRouter.post("/host/add-home" , homesController.postHome);

exports.hostRouter = hostRouter;
