import axios from 'axios'
import { CommonUtils } from '../utils/common.util.js'
import { NotFoundError } from '../errors/notFound.error.js'
import { TableModel } from '../models/tables.model.js'
import mongoose, { Types } from 'mongoose'

const getAllTable = async () => {
  return await TableModel.aggregate([
    {
      $lookup: {
        from: 'restaurants',
        localField: 'restaurantId',
        foreignField: '_id',
        as: 'restaurant'
      }
    },
    {
      $unwind: '$restaurant'
    },
    {
      $project: {
        _id: 1,
        restaurantId: 1,
        restaurantName: '$restaurant.name',
        name: 1,
        status: 1,
        createdAt: 1,
        updatedAt: 1
      }
    }
  ])
}

const getTableById = async (id) => {
  return await TableModel.aggregate([
    {
      $match: {
        _id: Types.ObjectId(id)
      }
    },
    {
      $lookup: {
        from: 'restaurants',
        localField: 'restaurantId',
        foreignField: '_id',
        as: 'restaurant'
      }
    },
    {
      $unwind: '$restaurant'
    },
    {
      $project: {
        _id: 1,
        restaurantId: 1,
        restaurantName: '$restaurant.name',
        name: 1,
        status: 1,
        createdAt: 1,
        updatedAt: 1
      }
    }
  ])
}

const createTable = async (data) => {
  return await TableModel.create(data)
}

const updateTable = async (id, data) => {
  return await TableModel.findByIdAndUpdate(id, data)
}

const deleteTable = async (id) => {
  return await TableModel.findByIdAndDelete(id)
}

export const TableService = {
  getAllTable,
  getTableById,
  createTable,
  updateTable,
  deleteTable
}
