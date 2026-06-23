const Home = require('../models/home');
const Favourite = require('../models/favourite');

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
 

exports.getHomeDetails = (req,res,next)=>{

  const homeId = req.params.homeId;
  Home.findById(homeId, home => {
    if(!home) {
      console.log("No home found for id: ", homeId);
      res.redirect("/homes");
    }else{
      res.render('store/home-detail', { home: home, pageTitle: 'Home Details', currentPage: 'Home' });
    }
     
  });
};

exports.postAddToFavourite = (req,res,next)=>{
  Favourite.addToFavourite(req.body.id, error => {
    if (error) {
      console.log("Error while marking favourite: ", error);
    }
    res.redirect("/favourites");
  })
}

exports.getFavouriteList = (req,res,next)=>{
  Favourite.getFavourites((favourites) => {
    Home.fetchAll((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter(home => favourites.includes(home.id));
      res.render('store/favourite-list', { registeredHomes: favouriteHomes, pageTitle: 'My Favourites', currentPage: 'favourites' });
    });
  });
};