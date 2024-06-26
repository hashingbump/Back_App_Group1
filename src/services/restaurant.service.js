import axios from 'axios'
import { CommonUtils } from '../utils/common.util.js'
import { NotFoundError } from '../errors/notFound.error.js'
import { RestaurantModel } from '../models/restaurants.model.js'
import mongoose from 'mongoose'

const getAllRestaurant = async () => {
  return await RestaurantModel.find()
}

const getRestaurantById = async (id) => {
  return await RestaurantModel.findById(id)
}

const createRestaurant = async (data) => {
  return await RestaurantModel.create(data)
}

const updateRestaurant = async (id, data) => {
  return await RestaurantModel.findByIdAndUpdate(id, data)
}

const deleteRestaurant = async (id) => {
  return await RestaurantModel.findByIdAndDelete(id)
}

const calculateDistance = async (origin, destination) => {
  const result = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json
  ?destinations=New%20York%20City%2C%20NY
  &origins=Washington%2C%20DC
  &units=imperial
  &key=YOUR_API_KEY`)
  return result
}
export const RestaurantService = {
  getAllRestaurant,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
}
