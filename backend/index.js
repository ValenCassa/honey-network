//Server
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'

// GraphQL
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'

// Config
import config from './config/PORT.js'
import typeDefs from './config/graphql/typeDefs.js'
import resolvers from './config/graphql/resolvers.js'
import db from './utils/db.js'

// Middleware
import {default as jwt} from 'jsonwebtoken'
import models from './models/index.js'

const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)

    await db.connectToDatabase()

    const schema = makeExecutableSchema({ typeDefs, resolvers })

    const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql'})

    const serverCleanup = useServer({ schema }, wsServer)

    const server = new ApolloServer({
        schema,
        context: async ({ req }) => ({
          currentUser: async () => {
            const auth = req ? req.headers.authorization : null
            if (auth && auth.toLowerCase().startsWith('bearer ')) {
              const decodedToken = jwt.verify(
                auth.substring(7), process.env.SECRET
              )
  
              const currentUser = await models.User.findByPk(decodedToken.id)
  
              return currentUser 
            }
          }
        }),
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                  return {
                    async drainServer() {
                      await serverCleanup.dispose()
                    },
                  }
                },
              },
        ]
    })

    await server.start()

    server.applyMiddleware({ app })

  
    httpServer.listen(config.PORT, () =>
      console.log(`Server is now running on http://localhost:${config.PORT}${server.graphqlPath}`)
    )
}

start()

