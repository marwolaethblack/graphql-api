const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type:GraphQLID },
        email: { type:GraphQLString },
        token: { type: GraphQLString },
        createdAt:{ type:GraphQLString },
        updatedAt:{ type:GraphQLString },
    }
})

module.exports = UserType;