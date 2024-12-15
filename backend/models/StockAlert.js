const mongoose = require('mongoose');
const Product = require('./Product');

const stockAlertSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productName: String,
    currentStock: Number,
    minStockLevel: Number,
  createdAt: { type: Date, default: Date.now }
});

stockAlertSchema.index({ productId: 1 }, { unique: true });

module.exports = mongoose.model('StockAlert', stockAlertSchema);
