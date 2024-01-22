const connectDB  = require('./db/connect');
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const notFound = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');
require('dotenv').config();
app.use(express.static('./public'));
app.use(express.json());


// app.get('/hello',(req,res)=>{
//   res.send("Hi");
// })
app.use('/api/v1/tasks', tasks);
app.use(notFound,errorHandlerMiddleware)

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`The app is listening on  port ${port}`));

  } catch (error) {
    console.log(error);
  }
}
start()