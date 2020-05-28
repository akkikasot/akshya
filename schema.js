const { gql } = require('apollo-server');

typeDefs =gql `
type Book {
    title: String
    author: Author
  }
  
  type Author {
    name: String
    books: [Book]
  }

  type Query {
    books: [Book]
    authors: [Author]
  }
  
  type ValidationError{
      field: String
      msg: String
  }
  type TimeOutError{
    reason: String
    seconds: Int
  }
  union Error = ValidationError | TimeOutError

  type Mutation {
    error : Error
  }
  enum Gender{
      MALE
      FEMALE 
  }
`;
module.exports = typeDefs;