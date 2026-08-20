const express = require('express');
const authControllers = require('../controllers/authControllers');

const authRouter = express.Router();


authRouter.get("/login", authControllers.getLogin);
authRouter.post("/login", authControllers.postLogin);
authRouter.post("/logout", authControllers.postLogout);
authRouter.get("/signup", authControllers.getSignUp);
authRouter.post("/signup", authControllers.postSignUp);
module.exports = authRouter;