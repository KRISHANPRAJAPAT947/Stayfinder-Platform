const express = require('express');
const path = require('path');
const hostControllers = require('../controllers/hostControllers');

const hostRouter  = express.Router();
const rootDir = require('../utils/pathUtil');

hostRouter.get("/host/add-home" , hostControllers.getAddhome);

hostRouter.post("/host/add-home" , hostControllers.postHome);

hostRouter.post("/host/host-home-list" , hostControllers.getHostHomes);

module.exports = hostRouter;
