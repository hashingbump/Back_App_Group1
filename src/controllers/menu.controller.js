import { Response } from '../dto/response/response.js'
import { MenuService } from '../services/menus.service.js'

const createMenuItem = async (req, res) => {
  try {
    const newItem = await MenuService.createMenuItem(req.body)
    new Response(201, 'Item created', newItem).resposeHandler(res)
  } catch (error) {
    new Response(error.statusCode || 500, error.message, null).resposeHandler(res)
  }
}

const getAllMenuItems = async (req, res) => {
  try {
    const items = await MenuService.getAllMenuItems()
    new Response(200, 'Success', items).resposeHandler(res)
  } catch (error) {
    new Response(500, error.message, null).resposeHandler(res)
  }
}

const getMenuItemById = async (req, res) => {
  try {
    const item = await MenuService.getMenuItemById(req.params.id)
    new Response(200, 'Success', item).resposeHandler(res)
  } catch (error) {
    new Response(error.message === 'Item not found' ? 404 : 500, error.message, null).resposeHandler(res)
  }
}

const updateMenuItemById = async (req, res) => {
  try {
    const item = await MenuService.updateMenuItemById(req.params.id, req.body)
    new Response(200, 'Item updated', item).resposeHandler(res)
  } catch (error) {
    new Response(error.message === 'Item not found' ? 404 : 400, error.message, null).resposeHandler(res)
  }
}

const deleteMenuItemById = async (req, res) => {
  try {
    await MenuService.deleteMenuItemById(req.params.id)
    new Response(200, 'Item deleted', null).resposeHandler(res)
  } catch (error) {
    new Response(error.message === 'Item not found' ? 404 : 500, error.message, null).resposeHandler(res)
  }
}

export const MenuController = {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItemById,
  deleteMenuItemById
}
