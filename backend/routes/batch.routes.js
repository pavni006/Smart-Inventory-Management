const router = require("express").Router();
const controller = require("../controllers/batch.controller");

router.post("/", controller.addBatch);
router.get("/", controller.getBatches);

module.exports = router;
