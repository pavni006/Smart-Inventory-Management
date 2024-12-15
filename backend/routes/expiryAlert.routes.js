const router = require("express").Router();
const ExpiryAlert = require("../models/ExpiryAlert");

router.get("/summary", async (req, res) => {
  const alerts = await ExpiryAlert.find();

  const summary = {
    "10_days": 0,
    "15_days": 0,
    "30_days": 0
  };

  alerts.forEach(alert => {
    if (alert.daysLeft <= 10) summary["10_days"]++;
    else if (alert.daysLeft <= 15) summary["15_days"]++;
    else if (alert.daysLeft <= 30) summary["30_days"]++;
  });

  res.json(summary);
});

router.get("/segregated", async (req, res) => {
  const alerts = await ExpiryAlert
    .find()
    .populate("productId")
    .populate("batchId");

  const result = {
    expiringIn10: [],
    expiringIn15: [],
    expiringIn30: []
  };

  alerts.forEach(alert => {
    if (alert.daysLeft <= 10) result.expiringIn10.push(alert);
    else if (alert.daysLeft <= 15) result.expiringIn15.push(alert);
    else if (alert.daysLeft <= 30) result.expiringIn30.push(alert);
  });

  res.json(result);
});


module.exports = router;
