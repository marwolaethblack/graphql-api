const jwt = require("jsonwebtoken");
const config = require('./config');

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secret, { issuer: config.issuer }, (err, decodedPayload) => {
            if(err) {
                reject(err);
            } else {
                resolve(decodedPayload);
            }
        })
    })
}


module.exports = verifyToken;