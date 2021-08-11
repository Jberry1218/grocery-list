const { request } = require("express");
const express = require("express");
const router = express.Router();

// Item model
const Item = require("../../models/Item");

// @route   GET api/items
// @desc    Get all items
router.get("/", (req, res) => {
    /*
    let pipeline = [
        {  $group: 
            {   _id: { category: "$category" }, 
                items: { $push: { name: "$name", id: "$_id", category: "$category", count: "$count" } }
            }
        }
    ];*/
    let pipeline = [
        {  $group: 
            {   _id: "$category", 
                items: { $push: { name: "$name", id: "$_id", category: "$category", count: "$count" } }
            }
        }
    ];
    Item.aggregate(pipeline)
        .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create an item
router.post("/", (req, res) => {
    Item.findOneAndUpdate({ name: req.body.name }, {$inc : {count : req.body.count }}, { new: true }, (err, upd) => {
        if (err) return res.status(404).json({itemAdded: false});
        res.json(upd)
    });
});

// @route   DELETE api/items/:id
// @desc    Delete an item
router.delete("/:id", (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.json({deleted: true}))
        )
        .catch(err => res.status(404).json({itemDeleted: false}));
})


module.exports = router;