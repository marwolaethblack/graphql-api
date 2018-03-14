const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
} = graphql;

const UserType = require('./types/UserType');
const AuthService = require('../auth');


module.exports = (User) => {

    const mutation = new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            signup: {
                type: UserType,
                args: {
                    email: { type: new GraphQLNonNull(GraphQLString) },
                    password: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve(parentValue,args) {

                    return User.findOne({where: { email: args.email }})
                        .then(foundUser => {
                            if(foundUser) {
                                throw new Error("User already exists")
                            }

                            return User.create({...args})
                                .then(u => {
                                    const newUser = u.dataValues;
                                    newUser.token = AuthService.signToken(u);
                                    console.log(newUser);
                                    return newUser;

                                })
                                .catch(e => {
                                    console.log(e);
                                    return(e);
                                })

                        })
                        .catch(e => {
                            console.log(e);
                            return e;
                        })
                }
            }

        }
    })

    return mutation;
}

