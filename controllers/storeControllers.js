const Home = require('../models/home');
const Favourite = require("../models/favourite");

exports.getIndex = (req,res,next)=>{
  
  Home.fetchAll().then(registeredHomes  => {
    res.render('store/index', { registeredHomes: registeredHomes, pageTitle: 'Home-List', currentPage: 'Home' });
  });
  
};


exports.getHomes = (req,res,next)=>{
  
  Home.fetchAll().then(registeredHomes => {
    res.render('store/home-list', { registeredHomes: registeredHomes, pageTitle: 'Home-List', currentPage: 'Home' });
  });

};

exports.getBookings = (req,res,next)=>{
  Home.fetchAll().then(registeredHomes => {
    res.render('store/bookings', { registeredHomes: registeredHomes, pageTitle: 'My Bookings', currentPage: 'bookings' });
  });
};

exports.getHomeDetails = (req,res,next)=>{

  const homeId = req.params.homeId;
  Home.findById(homeId).then(home => {
    
    if(!home) {
      console.log("No home found for id: ", homeId);
      res.redirect("/homes");
    }else{
      res.render('store/home-detail', { home: home, pageTitle: 'Home Details', currentPage: 'Home' });
    }
     
  });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  const fav = new Favourite(homeId);
  fav.save().then(result => {
    console.log('Fav added: ', result);
  }).catch(err => {
    console.log("Error while marking favourite: ", err);
  }).finally(() => {
    res.redirect("/favourites");
  })
};

exports.postDeleteFromFavourite = (req,res,next)=>{
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId).then(result => {
    console.log('Fav Removed: ', result);
  }).catch(err => {
    console.log("Error while removing favourite: ", err);
  }).finally(() => {
    res.redirect("/favourites");
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites().then(favourites => {
    favourites = favourites.map(fav => fav.houseId);
    Home.fetchAll().then(registeredHomes => {
      console.log(favourites, registeredHomes);
      const favouriteHomes = registeredHomes.filter((home) =>
        favourites.includes(home._id.toString())
      );
      res.render("store/favourite-list", {
        registeredHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    });
  });
};


    