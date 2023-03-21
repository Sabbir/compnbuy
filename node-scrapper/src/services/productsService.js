const products = require("./scrapper");

const getAllproducts = (pr) => {
    const allProducts = products.getAllProducts(pr)
    //console.log(allProducts)
    return allProducts
}
const getAllproductsJSON = () => {
    const allProducts = products.getAllProductsJSON()
  
    return allProducts
}

module.exports = {
                    getAllproducts,
                    getAllproductsJSON,
                }