const fs = require('fs')
const cheerio = require('cheerio')

const API =
  'http://books.toscrape.com/catalogue/category/books/mystery_3/index.html'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan') 
const app = express()

const v1ProductRouter = require("./v1/routes/productsRoute");




app.use(helmet())
app.use(bodyParser.json())

// enabling CORS for all requests
app.use(cors())

// adding morgan to log HTTP requests
app.use(morgan('combined'))

app.get('/', (req, res) => {

  
    //the promise is resolved here
    res.send("You reach the page. now close it down :)")
  
})

app.use("/api/v1/products", v1ProductRouter);



// starting the server
app.listen(80,() => {
  console.log('listening');
});
