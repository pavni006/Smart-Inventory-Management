const router = require("express").Router();
const StockAlert = require("../models/StockAlert");

router.get("/", async (req, res) => {
  const alerts = await StockAlert
    .find()
    .populate("productId");

  res.json(alerts);
});

module.exports = router;
