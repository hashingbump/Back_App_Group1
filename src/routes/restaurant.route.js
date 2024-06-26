import express from 'express'
import { RestaurantController } from '../controllers/restaurant.controller.js'
const RestaurantRouter = express.Router()

RestaurantRouter.get('/', RestaurantController.getAllRestaurant)
RestaurantRouter.get('/:id', RestaurantController.getRestaurantById)
RestaurantRouter.post('/', RestaurantController.createRestaurant)
RestaurantRouter.put('/:id', RestaurantController.updateRestaurant)
RestaurantRouter.delete('/:id', RestaurantController.deleteRestaurant)

export { RestaurantRouter }
