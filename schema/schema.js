const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema
} = graphql;

const UserType = require('./types/UserType');


const RootQuery = require('./rootQuery');

const mutation = require('./mutations');

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation
})

module.exports = schema;


