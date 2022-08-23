const express = require("express");
const category = require("../controllers/category");
const router = express.Router();

router.post("", category.createCategory);

router.get("", category.fetchCategories);

router.delete("/:id", category.deleteCategory);

router.put("", category.UpdateCategory);

router.get("/:id", category.getCategoryById);

module.exports = router;
