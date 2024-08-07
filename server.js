import express, { json } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'

import { body, validationResult } from 'express-validator'
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
import { SWAGGER_OPTION } from './src/configs/swagger.config.js'
import MenuRouter from './src/routes/menu.route.js'
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

app.use(json())
app.use(express.static('public'))
app.use(logRequestTime)
app.use(logRequestMethod)
app.use(cookieParser())
app.use('/logs', requireApiKey, LogRouter)
app.use('/restaurants', RestaurantRouter)
app.use('/tables', TableRouter)
app.use('/orders', OrderRouter)
app.use('/menus', MenuRouter)
app.use('/', UserRouter)
const DB_CONNECTION_STR = DATABASE_CONFIG.MONGO_DATABASE || 'mongodb://localhost:27017/restaurant'
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100000,
  standardHeaders: 'draft-7',
  legacyHeaders: false
})
const specs = swaggerJsdoc(SWAGGER_OPTION)
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
