// Import necessary packages
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define schema
const schema = buildSchema(`
  type Query {
    hello: String
    getUser(id: Int!): User
    getUsers: [User]
  }

  type Mutation {
    addUser(name: String!, email: String!): User
    deleteUser(id: Int!): Boolean
    updateUser(id: Int!, name: String, email: String): User
  }

  type User {
    id: Int
    name: String
    email: String
  }
`);

// Define some mock data for testing purposes
const users = [
  { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
];

// Define root resolver
const rootResolver = {
  hello: () => {
    return 'Hello, world!';
  },
  getUser: ({ id }) => {
    return users.find(user => user.id === id);
  },
  getUsers: () => {
    return users;
  },
  addUser: ({ name, email }) => {
    const id = users.length + 1;
    const newUser = { id, name, email };
    users.push(newUser);
    return newUser;
  },
  deleteUser: ({ id }) => {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      return false;
    }
    users.splice(index, 1);
    return true;
  },
  updateUser: ({ id, name, email }) => {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      return null;
    }
    const updatedUser = { ...users[index], name, email };
    users[index] = updatedUser;
    return updatedUser;
  },
};

// Create an Express app
const app = express();

// Add GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootResolver,
  graphiql: true, // enable GraphiQL tool for debugging/testing
}));

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
