const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    userId: {
        type: String,
        required: true
    },
    ingredients: [{
        name: {type: String, required: true},
        category: {type: String, required: true},
        count: {type: Number, required: true},
        include: {type: Boolean, required: true, default: true}
    }]
});

module.exports = Recipe = mongoose.model("Recipe", RecipeSchema);