import { BaseError } from './base.error.js'

export class UnAuthorizedError extends BaseError {
  constructor(message) {
    super(message)
    this.statusCode = 401
  }
}
