const { User } = require("../models");
const signToken = require('./signToken');

const signUp = async (userInfo) => {

    try {
        const { email, password } = userInfo;
        const foundUser = await User.findOne({ where: { email } });

        if(foundUser) {
            throw new Error("Email already exists");
        }

        const createdUser = await User.create({...userInfo});
        const userData = createdUser.dataValues;
        userData.token = signToken(userData);
        return userData;

    } catch(error) {
        console.log(error);
        return error;
    }

}

module.exports = signUp;

