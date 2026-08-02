const Home = require('../models/home');
const Favourite = require("../models/favourite");

exports.getIndex = (req,res,next)=>{
  
  Home.find().then(registeredHomes  => {
    res.render('store/index', { registeredHomes: registeredHomes, pageTitle: 'Home-List', currentPage: 'Home',
      isLoggedIn: req.isLoggedIn
     });
  });
  
};


exports.getHomes = (req,res,next)=>{
  
  Home.find().then(registeredHomes => {
    res.render('store/home-list', { registeredHomes: registeredHomes, pageTitle: 'Home-List', currentPage: 'Home', 
    isLoggedIn: req.isLoggedIn });
  });

};

exports.getBookings = (req,res,next)=>{
  Home.find().then(registeredHomes => {
    res.render('store/bookings', { registeredHomes: registeredHomes, pageTitle: 'My Bookings', currentPage: 'bookings', isLoggedIn: req.isLoggedIn });
  });
};

exports.getHomeDetails = (req,res,next)=>{

  const homeId = req.params.homeId;
  Home.findById(homeId).then(home => {
    
    if(!home) {
      console.log("No home found for id: ", homeId);
      res.redirect("/homes");
    }else{
      res.render('store/home-detail', { home: home, pageTitle: 'Home Details', currentPage: 'Home', isLoggedIn: req.isLoggedIn });
    }
     
  });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.findOne({houseId:homeId}).then((fav)=>{
    if(fav){
      console.log('home already added',fav);
    }else{
      fav = new Favourite({houseId:homeId});
      fav.save().then((result)=>{
        console.log('home add to favourite',result);
      });
    }
    res.redirect("/favourites");
  }).catch(()=>{
    console.log('error while adding ');
  })
};

exports.postDeleteFromFavourite = (req,res,next)=>{
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({homeId:homeId }).then(result => {
    console.log('Fav Removed: ', result);
  }).catch(err => {
    console.log("Error while removing favourite: ", err);
  }).finally(() => {
    res.redirect("/favourites");
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
  .populate('houseId').then((favourites) => {
    const favouriteHomes = favourites.map((fav) => fav.houseId);
      res.render("store/favourite-list", {
        registeredHomes: favouriteHomes,
        pageTitle: "My Favourites", 
        currentPage: "favourites",
        isLoggedIn: req.isLoggedIn
      });
  
  });
};


    