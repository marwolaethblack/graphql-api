const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema
} = graphql;

const {User} = require('../models');
const UserType = require('./types/UserType');
const AuthService = require('../auth');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parentValue, args) {
                return User.findById(args.id)
                    .then(u => {
                        console.log(u.dataValues);
                        return u.dataValues;
                    })
                    .catch(e => {
                        console.log(e);
                        return e;
                    });
            }

        },
        users: {
            type: GraphQLList(UserType),
            resolve(parentValue, args, context) {
                console.log(context.request.headers);
                return User.findAll()
                    .then(u => u)
                    .catch(e => {
                        console.log(e);
                        return e;
                    });

            }
        },
        protectedQuery: {
            type: GraphQLString,
            resolve(parentValue, args, context) {
                const token = AuthService.extractTokenFromHeader(context);

                return AuthService.verifyToken(token)
                    .then(res => {
                        if(res) {
                            return "Welcome to the protected query";
                        } else {
                            return "Invalid token"
                        }
                    })
                    .catch(e => {
                        return e;
                    })
            }
        }
    }
})

module.exports = RootQuery


