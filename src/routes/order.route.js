import express from 'express'
import { OrderController } from '../controllers/order.controller.js'
const OrderRouter = express.Router()

OrderRouter.get('/', OrderController.getAllOrder)
OrderRouter.get('/:id', OrderController.getOrderById)
OrderRouter.post('/', OrderController.createOrder)
OrderRouter.put('/:id', OrderController.updateOrder)
OrderRouter.delete('/:id', OrderController.deleteOrder)

export { OrderRouter }
