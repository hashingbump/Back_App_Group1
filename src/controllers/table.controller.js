import { BadRequestError } from '../errors/badRequest.error.js'
import { TableService } from '../services/table.service.js'
import { CommonUtils } from '../utils/common.util.js'

const getAllTable = async (req, res) => {
  try {
    const data = await TableService.getAllTable()
    res.json(data)
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message })
  }
}

const getTableById = async (req, res) => {
  try {
    const id = req.params.id
    const data = await TableService.getTableById(id)
    res.json(data)
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message })
  }
}

const createTable = async (req, res) => {
  try {
    const data = req.body
    if (CommonUtils.checkNullOrUndefined(data)) {
      throw new BadRequestError('Data is required')
    }
    const result = await TableService.createTable(data)
    res.json(result)
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message })
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
    res.json(result)
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message })
  }
}

const deleteTable = async (req, res) => {
  try {
    const id = req.params.id
    const result = await TableService.deleteTable(id)
    res.json(result)
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message })
  }
}

export const TableController = {
  getAllTable,
  getTableById,
  createTable,
  updateTable,
  deleteTable
}
