const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    found: {
        type: Boolean,
        default: false,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

module.exports = Item = mongoose.model("Item", ItemSchema);