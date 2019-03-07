const jwt = require('jsonwebtoken');

function decode(req, res, next){
    const token = req.headers.authorization.split(" ")[1];
    const decodeJWT = jwt.verify(token, process.env.JWT_KEY);
    console.log(decodeJWT);
    next()
    return decodeJWT;
}

module.exports = {
    decode: decode
}