const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args,context) => {
           if(context.user){
            const userRecords = await User.findOne({_id:context.user.})
           }
           throw new AuthenticationError("Use correct login")
        },
    },
    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(profile);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user with this email found!');
            }

            const correctPw = await profile.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(profile);
            return { token, profile };
        },

        saveBook: async (parent, args,context) => {
            if (context.user) {
                const info = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: args.bookInput }},
                    { new: true }
                );
                return info;
            }
            throw new AuthenticationError('Please login')

        },
        deleteBook: async (parent, { bookId },context) => {
            if (context.user) {
                const info = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return info;
            }
            throw new AuthenticationError('Please login')
        },
    },
};

module.exports = resolvers;
