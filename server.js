const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

// Include API routes
const items = require("./routes/api/items");
const user = require("./routes/api/users");

// Initialize express app
const app = express();

// Add middleware to handle request data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Import MongoDB
const db = config.get("mongoURI");

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log("Database connected"))
    .catch(err => console.error(err))

// Use routes
app.use("/api/items", items);

// Declare port
const port = process.env.PORT || 5000;

// Bind port
app.listen(port, () => console.log(`Server started on port ${port}`));