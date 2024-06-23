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

// Route init
app.use('/logs', requireApiKey, LogRouter)
app.use('/restaurants', RestaurantRouter)
app.use('/tables', TableRouter)
app.use('/orders', OrderRouter)
app.use('/', UserRouter)

const DB_CONNECTION_STR = 'mongodb://localhost:27017/restaurant'
async function start() {
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