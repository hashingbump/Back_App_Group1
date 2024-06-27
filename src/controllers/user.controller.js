import { Response } from '../dto/out/response.js'
import { BadRequestError } from '../errors/badRequest.error.js'
import { UserService } from '../services/user.service.js'
import { CommonUtils } from '../utils/common.util.js'

const login = async (req, res, next) => {
  try {
    if (CommonUtils.checkNullOrUndefined(req.body)) {
      throw new BadRequestError('Username is required')
    }
    const result = await UserService.login(...req.body)
    Response(200, 'Login success', result).resposeHandler(res)
  } catch (error) {
    Response(error.statusCode, error.message, null).resposeHandler(res)
  }
}
const register = async (req, res, next) => {
  try {
    if (CommonUtils.checkNullOrUndefined(req.body)) {
      throw new BadRequestError('Username is required')
    }
    await UserService.register(...req.body)
    Response(201, 'Register success', null).resposeHandler(res)
  } catch (error) {
    Response(error.statusCode, error.message, null).resposeHandler(res)
  }
}

export const UserController = { login, register }
