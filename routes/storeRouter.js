const express = require('express');
const storeController = require('../controllers/storeControllers');

const storeRouter  = express.Router();

storeRouter.get("/homes" ,storeController.getHomes);
storeRouter.get("/bookings" ,storeController.getBookings);
storeRouter.get("/" ,storeController.getIndex);
storeRouter.get("/favrourites" ,storeController.getFavrouriteList);

module.exports = storeRouter;