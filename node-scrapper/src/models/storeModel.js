const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String
  },
  price: {
    type: String
  },
  url: {
    type: String,
    required: [true, 'Product URL is required'],
    validate: {
      validator: function(v) {
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  img: {
    type: String,
    required: [true, 'Product image URL is required']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, { _id: false });

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  products: [productSchema],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update timestamp before saving
storeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Text index for search
//storeSchema.index({ name: 'text', 'products.title': 'text' });

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;