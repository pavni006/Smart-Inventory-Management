require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectMongo = require("./config/mongo.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/expiry-alerts", require("./routes/expiryAlert.routes"));
app.use("/api/stock-alerts", require("./routes/stockAlert.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/batches", require("./routes/batch.routes"));
app.use("/api/sales", require("./routes/sale.routes"));

const startServer = async () => {
  try {
    await connectMongo();

    require("./jobs/expiryChecker");
    require("./jobs/stockRefillChecker");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();
