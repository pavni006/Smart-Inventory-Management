
const cron = require('node-cron');
const Batch = require('../models/Batch');
const ExpiryAlert = require('../models/ExpiryAlert');

cron.schedule('0 0 * * *', async () => {
  try {
    
    const today = new Date();
    const batches = await Batch.find();

    for (let batch of batches) {
      const daysLeft = Math.ceil(
        (batch.expiryDate - today) / (1000 * 60 * 60 * 24)
      );

      if (daysLeft <= 30 && daysLeft >= 0) {
        const exists = await ExpiryAlert.findOne({
          batchId: batch._id,
          daysLeft
        });

        if (!exists) {
          await ExpiryAlert.create({
            batchId: batch._id,
            productId: batch.productId,
            daysLeft
          });
        }
      }
    }

    console.log("Expiry check completed");
  } catch (error) {
    console.error("Expiry cron error:", error.message);
  }
});
