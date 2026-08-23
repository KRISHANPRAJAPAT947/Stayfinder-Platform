const Home = require('../models/home');
const User = require("../models/user");
exports.getIndex = (req,res,next)=>{
  
  Home.find().then(registeredHomes  => {
    res.render('store/index', { registeredHomes: registeredHomes, pageTitle: 'Home-List', currentPage: 'Home',
      isLoggedIn: req.isLoggedIn, user: req.session.user
     });
  });
  
};


exports.getHomes = (req,res,next)=>{
  
  Home.find().then(registeredHomes => {
    res.render('store/home-list', { registeredHomes: registeredHomes, pageTitle: 'Home-List', currentPage: 'Home', 
    isLoggedIn: req.isLoggedIn, user: req.session.user });
  });

};

exports.getBookings = (req,res,next)=>{
  Home.find().then(registeredHomes => {
    res.render('store/bookings', { registeredHomes: registeredHomes, pageTitle: 'My Bookings', currentPage: 'bookings', isLoggedIn: req.isLoggedIn, user: req.session.user });
  });
};

exports.getHomeDetails = (req,res,next)=>{

  const homeId = req.params.homeId;
  Home.findById(homeId).then(home => {

    if(!home) {
      console.log("No home found for id: ", homeId);
      res.redirect("/homes");
    }else{
      res.render('store/home-detail', { home: home, pageTitle: 'Home Details', currentPage: 'Home', isLoggedIn: req.isLoggedIn, user: req.session.user });
    }
     
  });
};

exports.postAddToFavourite = async (req, res, next) => {
  try {
    const homeId = req.body.id;
    const userId = req.session.user.id;

    const [user, home] = await Promise.all([
      User.findById(userId),
      Home.findById(homeId)
    ]);

    if (!user || !home) {
      return res.redirect('/homes');
    }

    user.favourites.addToSet(home._id);
    await user.save();

    return res.redirect('/favourites');
  } catch (error) {
    return next(error);
  }
};

exports.postDeleteFromFavourite = async (req, res, next) => {
  try {
    const homeId = req.params.homeId;
    const userId = req.session.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.redirect('/login');
    }

    user.favourites.pull(homeId);
    await user.save();

    return res.redirect('/favourites');
  } catch (error) {
    return next(error);
  }
};

exports.getFavouriteList = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const user = await User.findById(userId).populate('favourites');

    if (!user) {
      return res.redirect('/login');
    }

    return res.render('store/favourite-list', {
      registeredHomes: user.favourites,
      pageTitle: 'Favourites',
      currentPage: 'favourites',
      isLoggedIn: req.isLoggedIn,
      user: req.session.user
    });
  } catch (error) {
    return next(error);
  }
};
