const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({ 
    productId : { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity : Number,
   // manufactureDate : Date,
    expiryDate : Date,
});

module.exports = mongoose.model('Batch', batchSchema);