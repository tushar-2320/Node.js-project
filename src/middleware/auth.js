const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    console.log("entered token : ",token);
    if (!token) return res.status(401).send('Access denied. No token provided.');
    console.log("here token is : ",token);
    const toke = token.startsWith('Bearer ') ? token.slice(7).trim() : token;

    try {
        console.log("now token: " ,toke);
        const decoded = jwt.verify(toke, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send('Invalid token.');
    }
};

module.exports = authenticate;
