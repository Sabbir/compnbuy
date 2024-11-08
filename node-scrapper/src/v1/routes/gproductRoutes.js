const express = require("express");
const productsController = require("../../controllers/productsController")
const router = express.Router();

router.get("/", (req, res) => {
  res.status(400).send({status: "INFORMATION", data: "Please search for a product"});
});

router.get("/:product", productsController.getAllgProducts)
router.get("/projson", productsController.getAllProductsJSON)

module.exports = router