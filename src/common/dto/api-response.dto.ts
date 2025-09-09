// src/common/dto/api-response.dto.ts
import { ResponseCode } from '../enums/response-code.enum'
import { ResponseMessage } from '../enums/response-message.enum'

export class ApiResponse<T> {
  code: number
  message: string
  data?: T

  constructor(code: ResponseCode, message: ResponseMessage | string, data?: T) {
    this.code = code
    this.message = message
    if (data !== undefined) {
      this.data = data
    }
  }

  static ok<T>(
    data: T,
    message: ResponseMessage | string = ResponseMessage.SUCCESS,
  ): ApiResponse<T> {
    return new ApiResponse(ResponseCode.SUCCESS, message, data)
  }

  static created<T>(
    data: T,
    message: ResponseMessage | string = ResponseMessage.CREATED,
  ): ApiResponse<T> {
    return new ApiResponse(ResponseCode.CREATED, message, data)
  }

  static error(
    code: ResponseCode,
    message: ResponseMessage | string,
  ): ApiResponse<null> {
    return new ApiResponse(code, message)
  }
}
