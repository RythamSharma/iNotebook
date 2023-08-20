var jwt = require('jsonwebtoken');
const JWT_SECRET = 'erfsivbfsdfhbxv';

const fetchuser = (req, res, next) => {
    const token = req.headers['auth-token'];
    if (!token) {
        return res.status(401).json({ error: "No valid token found" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token is not valid" });
    }
}

module.exports = fetchuser;
