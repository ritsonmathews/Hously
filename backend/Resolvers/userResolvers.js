const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../Models/User");

const createToken = (user) => {
  return jwt.sign({ userId: user._id }, "handy-man", { expiresIn: "1h" });
};

const userResolvers = {
  Query: {
    getUserById: async (_, { userId }) => {
      try {
        const user = await UserModel.findById(userId);

        if (!user) {
          throw new Error("User not found.");
        }

        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getUsers: async () => {
      try {
        const users = await UserModel.find();
        return users;
      } catch (error) {
        throw new Error("Failed to fetch Users");
      }
    },
  },
  Mutation: {
    signup: async (_, { input }) => {
      try {
        const existingUser = await UserModel.findOne({
          userName: input.userName,
        });
        if (existingUser) {
          throw new Error("User with that userName already exists.");
        }

        const hashedPassword = await bcrypt.hash(input.password, 12);

        const newUser = new UserModel({
          ...input,
          password: hashedPassword,
        });

        await newUser.save();

        const token = createToken(newUser);

        return { token, user: newUser };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (_, { input }) => {
      try {
        const user = await UserModel.findOne({ userName: input.userName });

        if (!user) {
          throw new Error("User not found.");
        }

        const isPasswordValid = await bcrypt.compare(
          input.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password.");
        }

        const token = createToken(user);

        return { token, user };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = userResolvers;
