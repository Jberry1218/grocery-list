const express = require("express");
const mongoose = require("mongoose");

// Include API routes
const items = require("./routes/api/items")

// Initialize express app
const app = express();

// Add middleware to handle request data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Import MongoDB
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected"))
    .catch(err => console.error(err))

// Use routes
app.use("/api/items", items);

// Declare port
const port = process.env.PORT || 5000;

// Bind port
app.listen(port, () => console.log(`Server started on port ${port}`));