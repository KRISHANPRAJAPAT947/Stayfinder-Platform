const express = require('express');
const path = require('path');
const hostControllers = require('../controllers/hostControllers');

const hostRouter  = express.Router();
const rootDir = require('../utils/pathUtil');

hostRouter.get("/host/add-home" , hostControllers.getAddHome);

hostRouter.post("/host/add-home" , hostControllers.postAddHome);

hostRouter.post("/host/host-home-list" , hostControllers.getHostHomes);

module.exports = hostRouter;
