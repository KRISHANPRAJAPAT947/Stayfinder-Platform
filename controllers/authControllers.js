exports.getLogin = (req,res,next)=>{
  res.render('auth/login', { pageTitle: 'Login', currentPage: 'login',
    isLoggedIn: false
   });
};

exports.postLogin = (req,res,next)=>{
  req.session.isLoggedIn = true;
  res.redirect('/');
};

exports.postLogout = (req,res,next)=>{
  req.session.destroy(()=>{
    res.redirect('/');
  });
  
};


exports.getSignUp = (req,res,next)=>{
  res.render('auth/signup', { pageTitle: 'SignUp', currentPage: 'signup',isLoggedIn: false})
};