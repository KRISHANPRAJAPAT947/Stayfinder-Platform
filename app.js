const express = require('express');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);

const DB_PATH = 'mongodb+srv://root:root@mycluster.k35qqsd.mongodb.net/test?appName=Mycluster';



const path = require('path');
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter');
const rootDir = require('./utils/pathUtil');
const errorsController = require('./controllers/errors');
const {default: mongoose }= require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

const store = new MongoDbStore({
  uri: DB_PATH,
  collection: 'sessions'
});

app.use(express.static(path.join(rootDir,'public')));

app.use((req,res,next)=>{
  console.log(req.url,req.method);
  next();
});
app.use(express.urlencoded());
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
  store: store
}));
app.use((req,res,next)=>{
  req.isLoggedIn = req.session.isLoggedIn ;
  next();
});
app.use(storeRouter);
app.use(hostRouter);
app.use("/host",(req,res,next)=>{
  if(req.isLoggedIn){
    next();
  }else{
    res.redirect('/auth/login');
  }
});
app.use(authRouter);
app.use(errorsController.pagenotfound); 
const port = 3000;


mongoose.connect(DB_PATH).then(()=>{
  console.log('connected to database');
  app.listen(port,()=>{
  console.log(`server running on http://localhost:${port}`);
});
}).catch((err)=>{
  console.log("Error connecting to database", err); 
});

