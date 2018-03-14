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
                resolve(parentValue,{ email, password }) {

                    return User.findOne({where: { email }})
                        .then(foundUser => {
                            if(foundUser) {
                                throw new Error("User already exists")
                            }

                            return User.create({email, password})
                                .then(u => {
                                    const newUser = u.dataValues;
                                    newUser.token = AuthService.signToken(u);
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
            },

            signin: {
                type: UserType,
                args: {
                    email: { type: new GraphQLNonNull(GraphQLString) },
                    password: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve(parentValue, { email, password }) {

                    return User.findOne({where: { email }})
                        .then(foundUser => {
                            if(!foundUser) {
                                throw new Error("Wrong credentials")
                            }

                            return foundUser.comparePasswords(password)
                                .then(res => {
                                    if(res) {
                                        const userData = foundUser.dataValues;
                                        userData.token = AuthService.signToken(userData);
                                        return userData;
                                    } else {
                                        throw new Error("Wrong credentials");
                                    }

                                })
                                .catch(e => {
                                    console.log(e);
                                    return e;
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

