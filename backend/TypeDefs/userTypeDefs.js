const { gql } = require("apollo-server-express");

const userTypeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    firstName: String
    lastName: String
    userName: String!
    age: String
    dob: Date
  }

  enum Role{
    USER
    ADMIN
  }

  enum profileStatus{
    ENABLED
    DISABLED
    BANNED
  }

  type Job {
    _id: ID!
    title: String!
    description: String!
    Salary: String!
    gender: String
    language: String
    location: String
    postedBy: User 
  }

  type Query {
    getUserById(userId: ID!): User
    getJobs: [Job]
    getUsers: [User]
  }

  type AuthPayload {
    token: String
    user: User
  }

  input JobInput {
    title: String!
    description: String!
    Salary: String!
    gender: String
    language: String
    location: String
  }

  input SignupInput {
    firstName: String
    lastName: String
    userName: String!
    password: String!
    age: String
    dob: Date
  }

  input LoginInput {
    userName: String!
    password: String!
  }

  type Mutation {
    signup(input: SignupInput!): AuthPayload
    login(input: LoginInput!): AuthPayload
    createJob(input: JobInput!): Job
  }

`;

module.exports = userTypeDefs;
