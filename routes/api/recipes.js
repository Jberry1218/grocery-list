const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Recipe model
const Recipe = require("../../models/Recipe");

// @route   GET api/recipes
// @desc    Get all recipes
router.get("/", auth, (req, res) => {
});

// @route   DELETE api/recipes/delete
// @desc    Delete an item
router.delete("/delete", (req, res) => {
})

// @route   POST api/recipes/add
// @desc    Add a recipe
router.post("/add", (req, res) => {
});

// @route   POST api/recipes/include
// @desc    Toggle whether an item should be added to grocery list
router.put("/found", (req, res) => {
});

// @route   GET api/recipes/includereset
// @desc    Set all items to include
router.put("/foundreset", (req, res) => {
});

// @route   POST api/recipes/edit
// @desc    Edit a recipe
router.put("/edit", (req, res) => {
});

module.exports = router;