const jwt = require('jsonwebtoken');

function decode(req, res, next){
    const token = req.headers.authorization.split(" ")[1];
    const decodeJWT = jwt.verify(token, process.env.JWT_KEY);
    console.log(decodeJWT);
    return decodeJWT;
}

function checkIfAdmin(req, res, next) {
    try {
        const decodeJWT = decode(req, res, next);
        if (decodeJWT.user.role === 'admin'){
            console.log("admin")
            next()
        } else{
            return res.status(200).json({
                state: 10,
                Message: 'Oops!.... Not Enough Permissions'
            });
        }
    } catch (error) {
        res.status(401).json({
            state: false
        })
    }
}

module.exports = {
    decode: decode,
    checkIfAdmin: checkIfAdmin
}