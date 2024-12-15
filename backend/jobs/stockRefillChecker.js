const cron = require("node-cron");
const Product = require("../models/Product");
const Batch = require("../models/Batch");
const StockAlert = require("../models/StockAlert");

cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Running midnight stock check...");

    const products = await Product.find();

    for (let product of products) {
      const batches = await Batch.find({ productId: product._id });

      const totalStock = batches.reduce(
        (sum, b) => sum + b.quantity,
        0
      );

      if (totalStock <= product.minStockLevel) {
        await StockAlert.findOneAndUpdate(
          { productId: product._id },
          {
            productId: product._id,
            productName: product.name,
            currentStock: totalStock,
            minStockLevel: product.minStockLevel
          },
          { upsert: true }
        );
      } else {
        await StockAlert.deleteOne({
          productId: product._id
        });
      }
    }

    console.log("Stock alert check completed");
  } catch (error) {
    console.error("Stock cron error:", error.message);
  }
});
