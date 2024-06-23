import axios from 'axios'
import { TableModel } from '../models/tables.model.js'
import { CommonUtils } from '../utils/common.util.js'
import { NotFoundError } from '../errors/notFound.error.js'
import { OrderModel } from '../models/orders.model.js'
import { Types } from 'mongoose'

const getAllOrder = async () => {
  return await OrderModel.aggregate([
    {
      $lookup: {
        from: 'tables',
        localField: 'tableId',
        foreignField: '_id',
        as: 'table'
      }
    },
    {
      $unwind: '$table'
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    {
      $project: {
        _id: 1,
        tableId: 1,
        tableName: '$table.name',
        total: 1,
        status: 1,
        createdAt: 1,
        updatedAt: 1
      }
    }
  ])
}

const getOrderById = async (id) => {
  return await OrderModel.aggregate([
    {
      $match: {
        _id: Types.ObjectId(id)
      }
    },
    {
      $lookup: {
        from: 'tables',
        localField: 'tableId',
        foreignField: '_id',
        as: 'table'
      }
    },
    {
      $unwind: '$table'
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    {
      $project: {
        _id: 1,
        tableId: 1,
        tableName: '$table.name',
        total: 1,
        status: 1,
        createdAt: 1,
        updatedAt: 1
      }
    }
  ])
}

const createOrder = async (data) => {
  return await OrderModel.create(data)
}

const updateOrder = async (id, data) => {
  return await OrderModel.findByIdAndUpdate(id, data)
}

const deleteOrder = async (id) => {
  return await OrderModel.findByIdAndDelete(id)
}
export const OrderService = {
  getAllOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
}
