import { BadRequestError } from '../errors/badRequest.error.js'
import { OrderService } from '../services/order.service.js'
import { CommonUtils } from '../utils/common.util.js'

const getAllOrder = async (req, res) => {
  try {
    const data = await OrderService.getAllOrder()
    res.json(data)
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message })
  }
}

const getOrderById = async (req, res) => {
  try {
    const id = req.params.id
    const data = await OrderService.getOrderById(id)
    res.json(data)
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message })
  }
}

const createOrder = async (req, res) => {
  try {
    const data = req.body
    if (CommonUtils.checkNullOrUndefined(data)) {
      throw new BadRequestError('Data is required')
    }
    const result = await OrderService.createOrder(data)
    res.json(result)
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message })
  }
}

const updateOrder = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    if (CommonUtils.checkNullOrUndefined(data)) {
      throw new BadRequestError('Data is required')
    }
    const result = await OrderService.updateOrder(id, data)
    res.json(result)
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message })
  }
}

const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id
    const result = await OrderService.deleteOrder(id)
    res.json(result)
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message })
  }
}

export const OrderController = {
  getAllOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
}
