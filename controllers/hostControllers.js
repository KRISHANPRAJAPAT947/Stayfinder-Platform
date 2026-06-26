const Home = require('../models/home');

exports.getAddHome = (req,res,next)=>{
  
  res.render('host/addhome',{pageTitle:'Add Home',currentPage:'addhome'});
};


exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
  );
};

exports.postAddHome = (req,res,next)=>{
  console.log(req.body);
  res.render('host/home-added',{pageTitle:'Home Added', currentPage: 'homeadded'});

  const home = new Home(req.body.hauseName , req.body.price , req.body.location , req.body.rating , req.body.image);
  home.save();

};

