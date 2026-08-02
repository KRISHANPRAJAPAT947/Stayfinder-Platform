const express = require('express');
const authControllers = require('../controllers/authControllers');

const authRouter = express.Router();


authRouter.get("/auth/login", authControllers.getLogin);
authRouter.post("/auth/login", authControllers.postLogin);
authRouter.post("/auth/logout", authControllers.postLogout);


module.exports = authRouter;