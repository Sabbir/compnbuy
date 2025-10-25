const productsService = require("../services/productsService");
const connectDB = require('./db');
// Connect to database
connectDB();

const storeService = require("../services/mongoService")

const {default: PQueue} = require('p-queue');
var rs;
// Initialize p-queue (max concurrency: 1 job at a time)
const queue = new PQueue({concurrency: 1});

const getAllProducts = (req, res) => {
   
  product = req.params.product
  queue.add(async () => {
   await productsService.getAllproducts(product).then((pr)=> {
      
      rs = pr;
      res.status(201).send(pr)
    }).catch(err=>{
      res.status(401).send({ error : err.message });
    })
    console.log(req.params.product)
  });

  queue.add(async () => {
    await processQueryInBackground(product);
  });
    
}
const getAlleProducts = (req, res) => {
   
  product = req.params.product
  queue.add(async () => {
   await productsService.getAlleproducts(product).then((pr)=> {
      //the promise is resolved here
      rs = pr
      res.status(201).send(pr)
    }).catch(err=>{
      res.status(401).send({ error : err.message });
    })
    console.log(req.params.product)
  });
  queue.add(async () => {
    await processQueryInBackground(product);
  });
    
}

const getAllgProducts = (req, res) => {
   
  product = req.params.product
   
   productsService.getAllgproducts(product).then((pr)=> {
      //the promise is resolved here
      
      res.status(201).send(pr)
    }).catch(err=>{
      res.status(401).send({ error : err.message });
    })
    console.log(req.params.product)
    
}

const getAllProductsJSON = (req, res) => {
  const allProducts = productsService.getAllproductsJSON()
  res.status(201).send({ status: "OK", data: allProducts });
}


const processQueryInBackground = (query) => {
  
  queue.add(async () => {
      try {
          console.log(`.. Saved query: "${query}"`);

          const db = storeService.createStore(rs);
          console.log(db)

          setTimeout(() => {
            console.log(`1 minutes have passed! "${query}"`);
            // Your code to execute after the delay
        }, 1 * 60 * 1000);
      } catch (err) {
          console.error(`.. Failed to save query: "${query}"`, err.message);
      }
  });
  
};

module.exports = {
                  getAllProducts,
                  getAlleProducts,
                  getAllgProducts,
                  getAllProductsJSON,
                }  