const Sequelize = require('sequelize')
let sequelize = null


if(process.env.NODE_ENV === "production") {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect:  'postgres',
        protocol: 'postgres',
        logging: true
    })
} else {
    sequelize = new Sequelize('mainDB', null, null, {
        dialect: "sqlite",
        storage: './db.sqlite',
    });
}

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });

const User = require("./User")(sequelize, Sequelize);

const db = {
    sequelize,
    Sequelize,
    User
};

module.exports = db;
