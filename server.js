const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema');
let timeFlag = false;


const resolvers = {
     Error: {
         __resolveType: (obj)=>{
            if(obj.reason){
                return "TimeOutError"
            }
            if(obj.field){
                return "ValidationError"
            }

            return null;
         }
     },

    Query: {
        books: ()=>[{title:'title1',author:{name:"A"}},{title:'title2',author:{name:"B"}}],
        authors: ()=>[{name:'author1'},{name:'author2'}]
    },
    Mutation: {

        error: ()=>{
            let error = {};
            if(timeFlag) {
                error = {
                    reason:'too many request',
                    seconds:100
                }
            }else{
                error = {
                    field:'email',
                    msg:'not valid email'
                }
            }
            timeFlag = !timeFlag;
            return error;
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen({port: 3000})
.then(({url})=>console.log(`server running at ${url}`));