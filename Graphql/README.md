npm init -y
npm install express
npm install express-graphql
npm install graphql
node server.js



query {
  hello
}


{
  getUser(id: 1) {
    id
    name
    email
  }
}
{
  getUsers {
    id
    name
    email
  }
}
mutation {
  addUser(name: "Bob Smith", email: "bobsmith@example.com") {
    id
    name
    email
  }
}
mutation {
  deleteUser(id: 1)
}
mutation {
  updateUser(id: 1, name: "John Smith", email: "johnsmith@example.com") {
    id
    name
    email
  }
}
