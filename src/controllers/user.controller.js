import { Response } from '../dto/response/response.js'
import { BadRequestError } from '../errors/badRequest.error.js'
import { UserService } from '../services/user.service.js'
import { CommonUtils } from '../utils/common.util.js'

const login = async (req, res, next) => {
  try {
    if (CommonUtils.checkNullOrUndefined(req.body)) {
      throw new BadRequestError('Username is required')
    }
    const result = await UserService.login(req.body)
    new Response(200, 'Login success', result).responseHandler(res)
  } catch (error) {
    new Response(error.statusCode || 500, error.message, null).responseHandler(res)
  }
}

const register = async (req, res, next) => {
  try {
    if (CommonUtils.checkNullOrUndefined(req.body)) {
      throw new BadRequestError('Username is required')
    }
    await UserService.register(req.body)
    new Response(201, 'Register success', null).responseHandler(res)
  } catch (error) {
    new Response(500, error.message, null).responseHandler(res)
  }
}

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await UserService.getUserById(id)
    if (!user) {
      throw new BadRequestError('User not found')
    }
    new Response(200, 'User fetched successfully', user).responseHandler(res)
  } catch (error) {
    new Response(error.statusCode || 500, error.message, null).responseHandler(res)
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers()
    new Response(200, 'Users fetched successfully', users).responseHandler(res)
  } catch (error) {
    new Response(500, error.message, null).responseHandler(res)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await UserService.deleteUser(id)
    if (!user) {
      throw new BadRequestError('User not found')
    }
    new Response(200, 'User deleted successfully', null).responseHandler(res)
  } catch (error) {
    new Response(error.statusCode || 500, error.message, null).responseHandler(res)
  }
}

export const UserController = { login, register, getUserById, getAllUsers, deleteUser }
