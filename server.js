import express, { json } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
// import { createServer } from 'node:http'
// import { Server } from 'socket.io'
import mongoose from 'mongoose'
import { LogRouter } from './src/routes/log.route.js'
import { RestaurantRouter } from './src/routes/restaurant.route.js'
import { TableRouter } from './src/routes/table.route.js'
import { OrderRouter } from './src/routes/order.route.js'
import { UserRouter } from './src/routes/user.route.js'
import { logRequestTime } from './src/middlewares/logRequestTime.middleware.js'
import { logRequestMethod } from './src/middlewares/logRequestMethod.middleware.js'
import { DATABASE_CONFIG } from './src/configs/database.config.js'
import { requireApiKey } from './src/middlewares/useApiKey.middleware.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// const server = createServer(app)
// const io = new Server(server)

const port = 3000
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  })
)
// HTTP logger
app.use(morgan('dev'))
app.use(morgan('combined'))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100000,
  standardHeaders: 'draft-7',
  legacyHeaders: false
})

app.use(json())
app.use(express.static('public'))
app.use(logRequestTime)
app.use(logRequestMethod)
app.use('/restaurants', RestaurantRouter)
app.use('/tables', TableRouter)
app.use('/orders', OrderRouter)
app.use('/', UserRouter)
const DB_CONNECTION_STR =
  'mongodb+srv://nguyenthanhnhonabc:nhon@app.2jwix0f.mongodb.net/?retryWrites=true&w=majority&appName=app'
const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'LogRocket Express API with Swagger',
      version: '0.1.0',
      description: 'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'LogRocket',
        url: 'https://logrocket.com',
        email: 'info@email.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./src/routes/*.js']
}

const specs = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))
const start = async () => {
  try {
    console.log('Start connecting...')
    await mongoose.connect(DB_CONNECTION_STR)
    console.log('Connect success')

    app.listen(port, () => {
      console.log(`Listening at port ${port}`)
    })
  } catch (error) {
    console.log('Error connect to database with error: ' + error.message)
  }
}

start()
