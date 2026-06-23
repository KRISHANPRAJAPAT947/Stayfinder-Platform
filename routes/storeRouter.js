const express = require('express');
const storeController = require('../controllers/storeControllers');

const storeRouter  = express.Router();

storeRouter.get("/homes" ,storeController.getHomes);
storeRouter.get("/bookings" ,storeController.getBookings);
storeRouter.get("/" ,storeController.getIndex);
storeRouter.get("/favourites" ,storeController.getFavouriteList);
storeRouter.get("/homes/:homeId" ,storeController.getHomeDetails);
storeRouter.post("/favourites" ,storeController.postAddToFavourite);

module.exports = storeRouter; 