const { validationResult, check } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req,res,next)=>{
  res.render('auth/login', { pageTitle: 'Login', currentPage: 'login',
    errorMessages: [], oldInput: { email: '' },
    user: {}, isLoggedIn: req.isLoggedIn
   });
};

exports.postLogin = async (req,res,next)=>{
  const {email, password} = req.body;

  await User.findOne({email})
  .then(async user=>{
    if(!user){
      return res.status(422).render('auth/login', {
        pageTitle: 'Login',
        currentPage: 'login',
        isLoggedIn: req.isLoggedIn,
        errorMessages: ['Invalid email or password'],
        oldInput: { email },
        user: {},
      });
    }

    await bcrypt.compare(password, user.password)
    .then(async doMatch=>{
      if(doMatch){
        req.session.isLoggedIn = true;
        req.session.user = {
          id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userType: user.userType
        };
        return req.session.save(err => {
          if (err) {
            return next(err);
          }
          return res.redirect('/');
        });
      }
      return res.status(422).render('auth/login', {
        pageTitle: 'Login',
        currentPage: 'login',
        isLoggedIn: req.isLoggedIn,
        errorMessages: ['Invalid email or password'],
        oldInput : {email},
        user: {},
      });
    })
    .catch(err=>{
      console.log(err);
      res.redirect('/login');
    });
  })
  .catch(err=>{
    console.log(err);
  });
};

exports.postLogout = (req,res,next)=>{
  req.session.destroy(()=>{
    res.redirect('/');
  });
  
};


exports.getSignUp = (req,res,next)=>{
  res.render('auth/signup', {
     pageTitle: 'SignUp',
      currentPage: 'signup',
      isLoggedIn: req.isLoggedIn,
      errorMessages: [],
      oldInput: { firstName: '', lastName: '', email: '', password: '', userType: '' },
        user: {},
    })
};

exports.postSignUp = [
  check('firstName')
  .trim()
  .isLength({min:2})  
  .withMessage('First name must be at least 2 characters long')
  .matches(/^[A-Za-z]+$/)
  .withMessage('First name can only contain letters'),

  check('lastName') 
  .matches(/^[A-Za-z]*$/)
  .withMessage('Last name can only contain letters'),

  check('email')
  .isEmail()
  .withMessage('Please enter a valid email')
  .normalizeEmail(),

  check('password')
  .isLength({min:8})
  .withMessage('Password must be at least 8 characters long')
  .matches(/[A-Z]/)
  .withMessage('Password must contain at least one uppercase letter')
  .matches(/[a-z]/)
  .withMessage('Password must contain at least one lowercase letter')
  .matches(/[0-9]/)
  .withMessage('Password must contain at least one number')
  .matches(/[\W_]/)
  .withMessage('Password must contain at least one special character'),

  check('confirmPassword')
  .trim()
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),

  check('userType')
  .notEmpty()
  .withMessage('User type is required')
  .isIn(['host', 'guest'])
  .withMessage('Invalid user type'),

  check('terms')
  .custom((value) => {
    if (!value) {
      throw new Error('You must agree to the terms and conditions');
    }
    return true;
  }),

(req,res,next)=>{
  const {firstName, lastName, email, password, userType} = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages= errors.array().map(error => error.msg);
    return res.status(422).render('auth/signup', {
      pageTitle: 'SignUp',
      currentPage: 'signup',
      isLoggedIn: req.isLoggedIn,
      errorMessages,
      oldInput: { firstName, lastName, email,password, userType },
        user: {},
    });
  }

  
  bcrypt.hash(password, 12)
  .then(hashedPassword=>{
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userType
    });

    return user.save();
  })
  .then(()=>{
    res.redirect('/login');
  })
  .catch(err=>{
    return res.status(422).render('auth/signup', {
      pageTitle: 'SignUp',
      currentPage: 'signup',
      isLoggedIn: req.isLoggedIn,
      errorMessages: [err.message],
      oldInput: { firstName, lastName, email,password, userType },
        user: {},
    });
  });
}];
