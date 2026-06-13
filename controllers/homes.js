const {Home} = require('../models/home');

exports.getAddhome = (req,res,next)=>{
  
  res.render('addhome',{pageTitle:'Add Home'});
};

exports.postHome = (req,res,next)=>{
  console.log(req.body);
  res.render('homeadded',{pageTitle:'Home Added'});

  const home = new Home(req.body.hauseName , req.body.price , req.body.location , req.body.rating , req.body.image);
  home.save();

};

exports.getHomes = (req,res,next)=>{
  
  Home.fetchAll((registeredhomes) =>
   {res.render('home',{homes:registeredhomes});}
  );
  
};

exports.page404 = (req,res,next)=>{
  res.status(404).render('404',{pageTitle:'Page Not Found'});
};

