const express = require("express");
const product = require("./../controllers/product");

const router = express.Router();

router.post("", product.createProduct);
router.get("", product.getProduct);
router.delete("/:id", product.deleteProduct);

module.exports = router;
