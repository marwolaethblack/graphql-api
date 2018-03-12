const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, Sequelize) => {
    let User = sequelize.define("User", {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Email is not valid"
                }
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                min: {
                    args: 6,
                    msg: "Password must be more than 6 characters"
                }
            }
        }
    })

    User.beforeCreate((user, options) => {
        return bcrypt.hash(user.password, saltRounds)
                .then(hash => user.password = hash)
                .catch(err => console.log(err))

    })

    User.beforeUpdate((user, options) => {
        if(user.changed('password')) {
            return bcrypt.hash(user.password, saltRounds)
                .then(hash => user.password = hash)
                .catch(err => console.log(err))
        }
    })

    User.prototype.comparePasswords = function(plaintextPassword) {
        return bcrypt.compare(plaintextPassword, this.password)

    }

    return User;

}

// Password compare example
//
// User.findById(3)
//     .then(u => {
//         u.comparePasswords("123456")
//             .then(res => console.log(res))
//             .catch(e => console.log(e))
//     })
//     .catch(e => console.log(e));