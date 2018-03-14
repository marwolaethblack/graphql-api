const jwt = require("jsonwebtoken");
const config = require('./config');
const { User } = require('../models');


const signToken = (userData) => {

    const { id, email } = userData;

    return jwt.sign(
        { id, email },
        config.secret,
        { expiresIn: '7d',
          issuer: config.issuer
        })



}

module.exports = signToken;


// const token = signup({id:5, email: "AAA@AAA"});
//
// jwt.verify(token, config.secret, { issuer: config.issuer }, function(err, decodedPayload) {
//    console.log(err.message);
//    console.log(decodedPayload);
// });
