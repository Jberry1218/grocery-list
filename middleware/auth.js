const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {

    // Check for token
    const tok = req.header("x-auth-token");
    if (!tok) return res.status(401).json({ error: "Authorization denied" });

    try {
        // Verify token
        const decoded = jwt.verify(tok, config.get("jwtSecret"));
        // Add user from payload
        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).json({ error: "Invalid token" });
    }
    
}

module.exports = auth;