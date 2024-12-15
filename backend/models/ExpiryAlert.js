const mongoose = require('mongoose');

const expiryAlertSchema = new mongoose.Schema({ 
    batchId : { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
    productId : { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    daysLeft : Number,
    createdAt : { type: Date, default: Date.now}
});

module.exports = mongoose.model('ExpiryAlert', expiryAlertSchema);