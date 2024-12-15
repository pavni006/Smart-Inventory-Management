const router = require("express").Router();
const Batch = require("../models/Batch");
const Sale = require("../models/Sale");

router.post("/", async (req, res) => {
  const { productId, quantitySold } = req.body;

  let remaining = quantitySold;

  // oldest expiry first
  const batches = await Batch.find({ productId })
    .sort({ expiryDate: 1 });

  for (let batch of batches) {
    if (remaining <= 0) break;

    if (batch.quantity >= remaining) {
      batch.quantity -= remaining;
      remaining = 0;
    } else {
      remaining -= batch.quantity;
      batch.quantity = 0;
    }

    await batch.save();
  }

  if (remaining > 0) {
    return res.status(400).json({
      message: "Not enough stock"
    });
  }

  await Sale.create({ productId, quantitySold });

  res.json({ message: "Sale recorded successfully" });
});

module.exports = router;
