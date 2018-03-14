const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
} = graphql;

const {User} = require('../models');
const UserType = require('./types/UserType');
const AuthService = require('../auth');


const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signUp: {
            type: UserType,
            args: {
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args) {
              return AuthService.signUp(args);
            }
        },

        signIn: {
            type: UserType,
            args: {
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args) {
                return AuthService.signIn(args);
            }
        }


    }
})

module.exports = mutation;

