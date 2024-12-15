const router = require("express").Router();
const controller = require("../controllers/product.controller");

router.post("/", controller.addProduct);
router.get("/", controller.getProducts);

module.exports = router;
