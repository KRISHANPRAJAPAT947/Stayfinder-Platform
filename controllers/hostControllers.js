const Home = require('../models/home');

exports.getAddHome = (req,res,next)=>{
  
  res.render('host/edit-home',{pageTitle:'Add Home',currentPage:'addhome',editing: false});
};

exports.getEditHome = (req,res,next)=>{ 
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  Home.findById(homeId).then(home => {
    if (!home) {
      return res.redirect('/host/host-home-list');
    }
    res.render('host/edit-home', {
      pageTitle: 'Edit Home',
      currentPage: 'host-homes',
      editing: editing,
      home: home 
    });
  });
};


exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then(registeredHomes =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
  );
};

exports.postAddHome = (req,res,next)=>{
  res.render('host/home-added',{pageTitle:'Home Added', currentPage: 'homeadded'});

  const home = new Home(req.body.houseName , req.body.price , req.body.location , req.body.rating , req.body.photoUrl, req.body.description); 
  home.save().then(()=>{
    console.log('home added successfully');
  });
  res.redirect('/host/host-home-list');
};

exports.postEditHome = (req,res,next)=>{
  const home = new Home(req.body.houseName , req.body.price , req.body.location , req.body.rating , req.body.photoUrl, req.body.description,req.body.id);
   home.save().then(()=>{
    console.log('home added successfully');
  });
  res.redirect('/host/host-home-list');
};

exports.postDeleteHome = (req,res,next)=>{
  const homeId = req.params.homeId;
  Home.deleteById(homeId).then(() => {
    res.redirect('/host/host-home-list');
  }).catch(err => {
    console.log("Error while deleting home: ", err);
    res.redirect('/host/host-home-list');
  });
  
};
