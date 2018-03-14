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

module.exports = (User) => {

    const RootQuery = require('./rootQuery')(User);

    const mutation = require('./mutations')(User);

    return new GraphQLSchema({
        query: RootQuery,
        mutation
    })
}

