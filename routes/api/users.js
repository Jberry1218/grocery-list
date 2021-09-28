const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// Get jwt secret
let jwtSecret;
if (process.env.NODE_ENV === "production") {
    jwtSecret = process.env.jwtSecret;
} else {
    jwtSecret = config.get("jwtSecret");
}

// User model
const User = require("../../models/User");

// @route   GET api/users
// @desc    Get user data
router.get("/", auth, (req, res) => {
    User.findById(req.user.id)
        .select("-password")
        .then(user => res.json(user))
        .catch(err => res.status(401).json({ msg: "Authentication denied" }))
});

// @route   POST api/users
// @desc    Register new user
router.post("/register", (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    User.findOne({ email: email })
        .then(user => {
            if(user) return res.status(400).json({ msg: "This email is already registered" });

            const newUser = new User ({
                firstName,
                lastName,
                email,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                jwtSecret,
                                { expiresIn: 7200 },
                                (err, tok) => {
                                    if (err) throw err;
                                    res.json({
                                        token: tok,
                                        user: {
                                            _id: user.id,
                                            firstName: user.firstName,
                                            lastName: user.lastName,
                                            email: user.email
                                        }
                                    })
                                }
                            )
                        })
                })
            })
        })
});

// @route   POST api/users
// @desc    Log in user
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    User.findOne({ email: email })
        .then(user => {
            if(!user) return res.status(400).json({ msg: "User does not exist" });
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: "Incorrect password" })
                    jwt.sign(
                        { id: user.id },
                        config.get("jwtSecret"),
                        { expiresIn: 7200 },
                        (err, tok) => {
                            if (err) throw err;
                            res.json({
                                token: tok,
                                user: {
                                    _id: user.id,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
        })
});

module.exports = router;