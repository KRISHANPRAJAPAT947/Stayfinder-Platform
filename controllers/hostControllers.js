const Home = require('../models/home');

exports.getAddHome = (req,res,next)=>{
  
  res.render('host/edit-home',{pageTitle:'Add Home',currentPage:'addhome',editing: false,
    isLoggedIn: req.isLoggedIn
  });
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
      home: home,
      isLoggedIn: req.isLoggedIn
    });
  });
};


exports.getHostHomes = (req, res, next) => {
  Home.find().then(registeredHomes =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn
    })
  );
};

exports.postAddHome = (req,res,next)=>{
  const {houseName , price , location , rating ,photoUrl,description} = req.body;
  const localImagePath = photoUrl.startsWith('images/') ? `/${photoUrl}` : photoUrl;

  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photoUrl: localImagePath,
    description
  });

  home.save()
    .then(() => res.redirect('/host/host-home-list'))
    .catch(next);
};

exports.postEditHome = (req,res,next)=>{
  const {houseName , price ,location , rating ,photoUrl,description,id}=req.body;
  
  Home.findById(id).then((home)=>{
    home.houseName=houseName;
    home.rating = rating;
    home.location=location;
    home.price=price;
    home.photoUrl=photoUrl;
    home.description=description;
    home.save().then((result)=>{
      console.log('home updated',home);
    }).catch((err)=>{
      console.log('error while podt edit home ', err);
    })
    res.redirect('/host/host-home-list');
  }).catch((err)=>{
    console.log(' valid id not found ',err);
    res.redirect('/host/host-home-list');
  })
  
};

exports.postDeleteHome = (req,res,next)=>{
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId).then(() => {
    res.redirect('/host/host-home-list');
  }).catch(err => {
    console.log("Error while deleting home: ", err);
    res.redirect('/host/host-home-list');
  });
  
};
