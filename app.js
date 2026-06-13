const express = require('express');
const path = require('path');
const userRouter = require('./routes/userRouter');
const {hostRouter} = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');
const errorsController = require('./controllers/errors');


const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

app.use((req,res,next)=>{
  console.log(req.url,req.method);
  next();
});
app.use(express.urlencoded());
app.use(userRouter);
app.use(hostRouter);


app.use(express.static(path.join(rootDir,'public')));

app.use(errorsController.pagenotfound);
const port = 3000;

app.listen(port,()=>{
  console.log(`server running on http://localhost:${port}`);
});