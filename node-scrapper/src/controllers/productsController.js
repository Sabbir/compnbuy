const productsService = require("../services/productsService");

const getAllProducts = (req, res) => {
   
  product = req.params.product
   
   productsService.getAllproducts(product).then((pr)=> {
      //the promise is resolved here
      
      res.status(201).send(pr)
    }).catch(err=>{
      res.status(401).send({ error : err.message });
    })
    console.log(req.params.product)
    
}
const getAlleProducts = (req, res) => {
   
  product = req.params.product
   
   productsService.getAlleproducts(product).then((pr)=> {
      //the promise is resolved here
      
      res.status(201).send(pr)
    }).catch(err=>{
      res.status(401).send({ error : err.message });
    })
    console.log(req.params.product)
    
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

module.exports = {
                  getAllProducts,
                  getAlleProducts,
                  getAllgProducts,
                  getAllProductsJSON,
                }  