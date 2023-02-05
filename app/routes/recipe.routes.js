const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipe.controller");

router.get("/", recipeController.findAll);
router.post("/", recipeController.create);
router.get("/:id", recipeController.findById);
router.put("/:id", recipeController.update);
router.delete("/:id", recipeController.delete);

module.exports = router;
