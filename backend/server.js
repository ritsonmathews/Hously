const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const userTypeDefs = require("./TypeDefs/userTypeDefs");
const userResolvers = require("./Resolvers/userResolvers");
const jobResolvers = require("./Resolvers/jobResolvers");
const adminResolvers = require("./Resolvers/adminResolvers");
const adminTypeDefs = require("./TypeDefs/adminTypeDefs");

async function startServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs: [userTypeDefs, adminTypeDefs],
    resolvers: [userResolvers, jobResolvers, adminResolvers],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  app.get("/", (req, res) => {
    res.send("Hello from Apollo Server!!!!");
  });

  await mongoose.connect(
    "mongodb+srv://akrishnan7023:akrishnan7023@cluster0.d8og6zg.mongodb.net/HandyMan?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  console.log("*** Mongoose Connected ***");
  app.listen(4000, () => {
    console.log("App is running at port 4000!");
  });
}

startServer();
