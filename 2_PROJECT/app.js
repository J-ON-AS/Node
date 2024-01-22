require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express();

app.use(express.json())
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products')
app.get('/',(req,res)=>{
  res.send('<h1>Store Api </h1> <a href="/api/v1/products">Products  Route</a>')
})

app.use('/api/v1/products',productsRouter)

app.use(errorMiddleware)
app.use(notFoundMiddleware)

const port = process.env.PORT ||  3000

const start = async ()=>{
  try {
    await connectDB (process.env.MONGO_URI)
    app.listen(port,console.log(`The server is listening on port ${port}`))
  } catch (error) {
    console.log(error);
  }
}
start()