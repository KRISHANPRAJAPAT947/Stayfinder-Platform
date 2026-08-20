const { validationResult, check } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

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
  res.render('auth/signup', {
     pageTitle: 'SignUp',
      currentPage: 'signup',
      isLoggedIn: false,
      errorMessages: [],
      oldInput: { firstName: '', lastName: '', email: '', password: '', userType: '' }
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
      isLoggedIn: false,
      errorMessages,
      oldInput: { firstName, lastName, email,password, userType }
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
      isLoggedIn: false,
      errorMessages: [err.message],
      oldInput: { firstName, lastName, email,password, userType }
    });
  });
}];



