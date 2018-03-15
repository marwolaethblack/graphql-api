const signToken = require('./signToken');
const verifyToken = require('./verifyToken');
const extractTokenFromHeader = require('./extractTokenFromHeader');
const signIn = require('./signIn');
const signUp = require('./signUp');

module.exports = { signToken, verifyToken, extractTokenFromHeader, signUp, signIn };