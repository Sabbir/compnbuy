const Store = require('../models/storeModel');

class StoreService {
  // Store operations
  

  async getStoreById(storeId) {
    try {
      const store = await Store.findById(storeId);
      if (!store) {
        throw new Error('Store not found');
      }
      return store;
    } catch (error) {
      throw new Error(`Error fetching store: ${error.message}`);
    }
  }

  async getStoreByName(storeName) {
    try {
      const store = await Store.findOne({ name: storeName });
      if (!store) {
        throw new Error('Store not found');
      }
      return store;
    } catch (error) {
      throw new Error(`Error fetching store: ${error.message}`);
    }
  }

  async getAllStores() {
    try {
      return await Store.find({});
    } catch (error) {
      throw new Error(`Error fetching stores: ${error.message}`);
    }
  }

  async updateStore(storeId, updateData) {
    try {
      const store = await Store.findByIdAndUpdate(
        storeId,
        updateData,
        { new: true, runValidators: true }
      );
      if (!store) {
        throw new Error('Store not found');
      }
      return store;
    } catch (error) {
      throw new Error(`Error updating store: ${error.message}`);
    }
  }

  async deleteStore(storeId) {
    try {
      const store = await Store.findByIdAndDelete(storeId);
      if (!store) {
        throw new Error('Store not found');
      }
      return { message: 'Store deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting store: ${error.message}`);
    }
  }

  // Product operations
  async addProductToStore(storeId, productData) {
    try {
      const store = await Store.findById(storeId);
      if (!store) {
        throw new Error('Store not found');
      }
      
      store.products.push(productData);
      await store.save();
      return store;
    } catch (error) {
      throw new Error(`Error adding product: ${error.message}`);
    }
  }

  async getProductsInStore(storeId) {
    try {
      const store = await Store.findById(storeId);
      if (!store) {
        throw new Error('Store not found');
      }
      return store.products;
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  async getProductById(storeId, productId) {
    try {
      const store = await Store.findById(storeId);
      if (!store) {
        throw new Error('Store not found');
      }
      
      // Since we're not using _id for products, we'll use the createdAt as identifier
      const product = store.products.find(p => p.createdAt.toString() === productId);
      if (!product) {
        throw new Error('Product not found in this store');
      }
      return product;
    } catch (error) {
      throw new Error(`Error fetching product: ${error.message}`);
    }
  }

  async updateProductInStore(storeId, productId, updateData) {
    try {
      const store = await Store.findById(storeId);
      if (!store) {
        throw new Error('Store not found');
      }
      
      const productIndex = store.products.findIndex(p => p.createdAt.toString() === productId);
      if (productIndex === -1) {
        throw new Error('Product not found in this store');
      }
      
      // Update product fields
      Object.assign(store.products[productIndex], updateData);
      store.markModified('products');
      await store.save();
      
      return store.products[productIndex];
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  async deleteProductFromStore(storeId, productId) {
    try {
      const store = await Store.findById(storeId);
      if (!store) {
        throw new Error('Store not found');
      }
      
      const initialLength = store.products.length;
      store.products = store.products.filter(p => p.createdAt.toString() !== productId);
      
      if (store.products.length === initialLength) {
        throw new Error('Product not found in this store');
      }
      
      await store.save();
      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }
}

module.exports = new StoreService();