const storeService = require('../services/mongoService');
const connectDB = require('./db');

// Connect to database
connectDB();

exports.getStore = async (req, res) => {
  try {
    const store = await storeService.getStoreById(req.params.id);
    res.json(store);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getAllStores = async (req, res) => {
  try {
    const stores = await storeService.getAllStores();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStore = async (req, res) => {
  try {
    const store = await storeService.updateStore(req.params.id, req.body);
    res.json(store);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteStore = async (req, res) => {
  try {
    const result = await storeService.deleteStore(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const store = await storeService.addProductToStore(req.params.storeId, req.body);
    res.status(201).json(store);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await storeService.getProductsInStore(req.params.storeId);
    res.json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await storeService.getProductById(
      req.params.storeId,
      req.params.productId
    );
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await storeService.updateProductInStore(
      req.params.storeId,
      req.params.productId,
      req.body
    );
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const result = await storeService.deleteProductFromStore(
      req.params.storeId,
      req.params.productId
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};