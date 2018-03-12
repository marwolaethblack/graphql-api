//Express dependencies and setup
const express        = require("express");
const http           = require('http');
const path           = require('path');
const compression    = require('compression');
const app            = express();

app.use(compression());
app.set('port', process.env.PORT || 3110);

const { sequelize, User } = require('./models');


//GraphQL dependencies
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema')(User);

app.use('/graphql', expressGraphQL(({
    graphiql: true,
    schema
})));



app.get('/', (req, res) => {
    User.findAll()
    .then(temps => {
        res.json(temps);
    })
    .catch(err => {
        res.json(err);
    })



})

sequelize.sync().then(function() {
    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
});


