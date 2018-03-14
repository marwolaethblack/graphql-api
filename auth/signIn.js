const { User } = require("../models");
const signToken = require('./signToken');

const signIn = async (userInfo) => {

    try {
        const { email, password } = userInfo;
        const foundUser = await User.findOne({ where: { email } });
        if(!foundUser) {
            throw new Error("Wrong credentials");
        }

        const passwordMatch = await foundUser.comparePasswords(password);
        if(passwordMatch) {
            const userData = foundUser.dataValues;
            userData.token = await signToken(userData);
            return userData;
        } else {
            throw new Error("Wrong credentials");
        }

    } catch(error) {
        console.log(error);
        return error;
    }

}

module.exports = signIn;