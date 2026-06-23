const express = require('express');
const path = require('path');
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');
const errorsController = require('./controllers/errors');


const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

app.use(express.static(path.join(rootDir,'public')));

app.use((req,res,next)=>{
  console.log(req.url,req.method);
  next();
});
app.use(express.urlencoded());
app.use(storeRouter);
app.use(hostRouter);

app.use(errorsController.pagenotfound); 
const port = 3000;

app.listen(port,()=>{
  console.log(`server running on http://localhost:${port}`);
});