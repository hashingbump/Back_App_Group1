import { HttpStatusCode } from 'axios'
import { validationResult } from 'express-validator'

export const handleValidationErrors = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    Response(HttpStatusCode.BadRequest, 'Validation error', errors.array()).resposeHandler(res)
  }
  next()
}
