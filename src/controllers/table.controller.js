import { Response } from '../dto/response/response.js'
import { BadRequestError } from '../errors/badRequest.error.js'
import { TableService } from '../services/table.service.js'
import { CommonUtils } from '../utils/common.util.js'

const getAllTable = async (req, res, next) => {
  try {
    const data = await TableService.getAllTable()
    new Response(200, 'Success', data).resposeHandler(res)
  } catch (error) {
    new Response(error.statusCode, error.message, null).resposeHandler(res)
  }
}

const getTableById = async (req, res, next) => {
  try {
    const id = req.params.id
    const data = await TableService.getTableById(id)
    new Response(200, 'Success', data).resposeHandler(res)
  } catch (error) {
    new Response(error.statusCode, error.message, null).resposeHandler(res)
  }
}

const createTable = async (req, res) => {
  try {
    const data = req.body
    if (CommonUtils.checkNullOrUndefined(data)) {
      throw new BadRequestError('Data is required')
    }
    const result = await TableService.createTable(data)
    new Response(201, 'Success', result).resposeHandler(res)
  } catch (error) {
    new Response(error.statusCode, error.message, null).resposeHandler(res)
  }
}

const updateTable = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    if (CommonUtils.checkNullOrUndefined(data)) {
      throw new BadRequestError('Data is required')
    }
    const result = await TableService.updateTable(id, data)
    new Response(200, 'Success', result).resposeHandler(res)
  } catch (error) {
    new Response(error.statusCode, error.message, null).resposeHandler(res)
  }
}

const deleteTable = async (req, res) => {
  try {
    const id = req.params.id
    const result = await TableService.deleteTable(id)
    new Response(200, 'Success', result).resposeHandler(res)
  } catch (error) {
    new Response(error.statusCode, error.message, null).resposeHandler(res)
  }
}

export const TableController = {
  getAllTable,
  getTableById,
  createTable,
  updateTable,
  deleteTable
}
