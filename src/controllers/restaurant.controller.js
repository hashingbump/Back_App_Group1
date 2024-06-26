// import { Response } from '../dto/out/response.js'
import { BadRequestError } from '../errors/badRequest.error.js'
import { NotFoundError } from '../errors/notFound.error.js'
import { RestaurantService } from '../services/restaurant.service.js'
import { CommonUtils } from '../utils/common.util.js'

const getAllRestaurant = async (req, res) => {
  try {
    const data = await RestaurantService.getAllRestaurant()
    res.json(data)
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message })
  }
}

const getRestaurantById = async (req, res) => {
  try {
    const id = req.params.id
    const data = await RestaurantService.getRestaurantById(id)
    // res.json(Response(200, 'Success', data))
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message })
  }
}

const createRestaurant = async (req, res) => {
  try {
    const data = req.body
    if (CommonUtils.checkNullOrUndefined(data)) {
      throw new BadRequestError('Data is required')
    }
    const result = await RestaurantService.createRestaurant(data)
    res.json(result)
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message })
  }
}

const updateRestaurant = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    if (CommonUtils.checkNullOrUndefined(data)) {
      throw new BadRequestError('Data is required')
    }
    const result = await RestaurantService.updateRestaurant(id, data)
    res.json(result)
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message })
  }
}

const deleteRestaurant = async (req, res) => {
  try {
    const id = req.params.id
    const result = await RestaurantService.deleteRestaurant(id)
    res.json(result)
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message })
  }
}

export const RestaurantController = {
  getAllRestaurant,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
}
