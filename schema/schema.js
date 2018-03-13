const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema
} = graphql;

module.exports = (User) => {
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

    const RootQuery = new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            user: {
                type: UserType,
                args: { id: { type: GraphQLID } },
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
            }
        }
    })

    const mutation = new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            addUser: {
                type: UserType,
                args: {
                    email: { type: new GraphQLNonNull(GraphQLString) },
                    password: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve(parentValue,args) {
                    return User.create({...args})
                        .then(u => u)
                        .catch(e => {
                            console.log(e);
                            return(e);
                        })
                }
            }

        }
    })

    return new GraphQLSchema({
        query: RootQuery,
        mutation
    })
}

