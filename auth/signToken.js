const jwt = require("jsonwebtoken");
const config = require('./config');


const signToken = (userData) => {

    return new Promise((resolve, reject) => {
        const { id, email } = userData;
        jwt.sign(
            { id, email },
            config.secret,
            { expiresIn: '7d', issuer: config.issuer},
            (error, token) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(token)
                }
            })
    })
}

module.exports = signToken;
