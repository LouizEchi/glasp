"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_lambda_1 = require("apollo-server-lambda");
const Query = apollo_server_lambda_1.gql `
  type Query {
    userRetrieve(id: Int!): User

    userList(
      id: Int
      email: String
      password: String
      first_name: String
      last_name: String
      company: String
      is_active: Boolean
    ): [User]
  }
`;
const Mutation = apollo_server_lambda_1.gql `
  type Mutation {
    userCreate(
      email: String!
      password: String!
      first_name: String!
      last_name: String!
      company: String
      is_active: Boolean
    ): User

    userUpdate(
      id: Int!
      email: String
      password: String
      first_name: String
      last_name: String
      company: String
      is_active: Boolean
    ): User
    userRemove(id: Int!): User
  }
`;
const Types = apollo_server_lambda_1.gql `
  type User {
    id: Int!
    email: String!
    first_name: String!
    last_name: String!
    company: String
    is_active: Boolean
  }
`;
exports.schema = apollo_server_lambda_1.gql `
  ${Query}

  ${Mutation}

  ${Types}
`;
//# sourceMappingURL=schema.js.map