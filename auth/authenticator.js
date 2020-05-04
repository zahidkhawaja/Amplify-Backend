const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET || "meh";
    // If a token exists, verify it
    token ? 
    jwt.verify(token, secret, (error, decodedToken) => {
        if(error) {
            res.status(401).json({ message: "Cannot authorize" })
        } else {
            req.decodedToken = decodedToken;
            next();
        }
}) :
    res.status(400).json({ message: "Please provide credentials" })
}; 