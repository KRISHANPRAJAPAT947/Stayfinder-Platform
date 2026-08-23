const express = require('express');
const storeController = require('../controllers/storeControllers');

const storeRouter  = express.Router();

const requireLogin = (req, res, next) => {
  if (!req.isLoggedIn || !req.session.user?.id) {
    return res.redirect('/login');
  }
  return next();
};

storeRouter.get("/homes" ,storeController.getHomes);
storeRouter.get("/bookings" ,storeController.getBookings);
storeRouter.get("/" ,storeController.getIndex);
storeRouter.get("/favourites", requireLogin, storeController.getFavouriteList);
storeRouter.get("/homes/:homeId" ,storeController.getHomeDetails);
storeRouter.post("/favourites", requireLogin, storeController.postAddToFavourite);
storeRouter.post("/favourites/delete/:homeId", requireLogin, storeController.postDeleteFromFavourite);

module.exports = storeRouter;
