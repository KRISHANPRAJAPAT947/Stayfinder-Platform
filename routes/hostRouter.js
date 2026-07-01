const express = require('express');
const path = require('path');
const hostControllers = require('../controllers/hostControllers');

const hostRouter  = express.Router();
const rootDir = require('../utils/pathUtil');

hostRouter.get("/host/add-home" , hostControllers.getAddHome);

hostRouter.post("/host/add-home" , hostControllers.postAddHome);

hostRouter.get("/host/host-home-list", hostControllers.getHostHomes);

hostRouter.get("/host/edit-home/:homeId", hostControllers.getEditHome); 

hostRouter.post("/host/edit-home", hostControllers.postEditHome);

hostRouter.post("/host/delete-home/:homeId", hostControllers.postDeleteHome);

module.exports = hostRouter;
