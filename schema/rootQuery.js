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

    return RootQuery
}


