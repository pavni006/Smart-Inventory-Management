const Batch = require("../models/Batch");

exports.addBatch = async (req, res) => {
  const { productId, quantity, expiryDate } = req.body; 
    const batch = new Batch({
        productId,
        quantity,
        expiryDate
    });
    await batch.save();
    res.status(201).json(batch);
};

exports.getBatches = async (req, res) => {
    const batches = await Batch.find().populate("productId");
    res.json(batches);
};
