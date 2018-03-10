module.exports = (sequelize, Sequelize) => {
    return sequelize.define("User", {
        email: Sequelize.STRING,
        password: Sequelize.STRING,
    })
}