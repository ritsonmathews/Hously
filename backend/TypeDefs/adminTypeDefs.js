const { gql } = require("apollo-server-express");

const adminTypeDefs = gql`
  #Service TypeDefs

  type Service {
    _id: ID!
    code: String!
    description: String!
    task: String!
  }

  input CreateServiceInput {
    code: String!
    description: String!
    task: String!
  }

  input UpdateServiceInput {
    code: String!
    description: String
    task: String
  }

  type Query {
    getService(id: ID!): Service
    getAllServices: [Service]
  }

  type Mutation {
    createService(input: CreateServiceInput!): Service
    updateService(id: ID!, input: UpdateServiceInput!): Service
    deleteService(id: ID!): Service
  }
`;

module.exports = adminTypeDefs;
