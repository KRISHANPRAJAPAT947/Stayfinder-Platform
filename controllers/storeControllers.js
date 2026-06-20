const Home = require('../models/home');


exports.getIndex = (req,res,next)=>{
  
  Home.fetchAll((registeredHomes) =>
   {res.render('store/index',{registeredHomes: registeredHomes, pageTitle: 'airbnb Home',currentPage: 'index'});}
  );
  
};


exports.getHomes = (req,res,next)=>{
  
  Home.fetchAll((registeredHomes) =>
   {res.render('store/home-list',{registeredHomes: registeredHomes, pageTitle: 'Home-List',currentPage: 'Home'});}
  );
  
};

exports.getBookings = (req,res,next)=>{
  Home.fetchAll((registeredHomes) =>
   {res.render('store/bookings',{registeredHomes: registeredHomes, pageTitle: 'My Bookings',currentPage: 'bookings'});}
  );
}; 

exports.getFavrouriteList = (req,res,next)=>{
  Home.fetchAll((registeredHomes) =>
   {res.render('store/favrourite-list',{registeredHomes: registeredHomes, pageTitle: 'My Favourites',currentPage: 'favourites'});}
  );
}; 
