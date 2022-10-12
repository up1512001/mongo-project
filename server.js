const mongoose = require('mongoose')
const bodyParser = require('body-parser');


const keys = require('./keys/keys')
const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');
const express = require('express');
const http = require('http');
const typeDefs = require('./api/graphql/Schema/index')
const resolvers = require('./api/graphql/Resolver/index');
const { getUser } = require('./api/graphql/Resolver/userResolver');
mongoose.connect(keys.URI,(error) => {
    if(error){
        console.log(error)
    }else{
      console.log("MongoDB Connected")
    }
})
const app = express();
async function startApolloServer() {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.post('/getUserData',(req,res)=>{
  console.log("received Data:->",req.body);
  getUser(req.body);
  res.status(200).send('data inserted');
})


app.listen(5000,()=>{
  console.log(`listning on 5000 port`);
})