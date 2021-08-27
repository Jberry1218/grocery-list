const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Recipe model
const Recipe = require("../../models/Recipe");

// @route   GET api/recipes
// @desc    Get all recipes
router.get("/", auth, (req, res) => {
    let pipeline = [
        { $sort: { name: 1 } },
        { $match: { userId: req.query.userId } }
    ];
    Recipe.aggregate(pipeline)
        .then(recipes => res.json(recipes));
});

// @route   DELETE api/recipes/delete
// @desc    Delete a recipe
router.delete("/delete", (req, res) => {
    Recipe.findById(req.body.id)
        .then(recipe => recipe.remove()
            .then(() => res.json(req.body))
        )
        .catch(err => res.status(404).json({recipeDeleted: false}));
})

// @route   POST api/recipes/add
// @desc    Add a recipe
router.post("/add", (req, res) => {
    const filter = { name: req.body.name };
    const update = {name: req.body.name, url: req.body.url, userId: req.body.userId, ingredients: req.body.ingredients};
    Recipe.findOneAndUpdate(filter, update, { new: true, upsert: true }, (err, recipe) => {
        if (err) return res.status(404).json({recipeAdded: false});
        res.json(recipe)
    });
});

// @route   POST api/recipes/update
// @desc    Update a recipe
router.put("/update", (req, res) => {
    const recipeChanges = { "$set": {
        name: req.body.name,
        url: req.body.url,
        userId: req.body.userId,
        ingredients: req.body.ingredients
    }}
    Recipe.findOneAndUpdate({ _id: req.body.id }, recipeChanges, { new: true }, (err, updatedRecipe) => {
        if (err) return res.status(404).json({recipeUpdated: false});
        res.json(updatedRecipe)
    });
});

module.exports = router;