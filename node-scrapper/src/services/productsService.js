const products = require("./scrapper");
const eProducts = require("./eScrapper");
const gProducts = require("./gScrapper");


const getAllproducts = (pr) => {
    const allProducts = products.getAllProducts(pr)
    //console.log(allProducts)
    return allProducts
}
const getAlleproducts = (pr) => {
    const alleProducts = eProducts.getAlleProducts(pr)
    //console.log(allProducts)
    return alleProducts
}
const getAllgproducts = (pr) => {
    const allgProducts = gProducts.getAllgProducts(pr)
    //console.log(allProducts)
    return allgProducts
}
const getAllproductsJSON = () => {
    const allProducts = products.getAllProductsJSON()
  
    return allProducts
}

module.exports = {
                    getAllproducts,
                    getAlleproducts,
                    getAllgproducts,
                    getAllproductsJSON,
                }