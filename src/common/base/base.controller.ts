import { ApiResponse } from '../dto/api-response.dto'
import { ResponseCode } from '../enums/response-code.enum'
import { ResponseMessage } from '../enums/response-message.enum'

// @ts-ignore
export abstract class BaseController {
  protected ok<T>(
    data: T,
    message: ResponseMessage | string = ResponseMessage.SUCCESS,
  ): ApiResponse<T> {
    return ApiResponse.ok(data, message)
  }

  protected created<T>(
    data: T,
    message: ResponseMessage | string = ResponseMessage.CREATED,
  ): ApiResponse<T> {
    return ApiResponse.created(data, message)
  }

  protected error(
    message: ResponseMessage | string,
    code: ResponseCode = ResponseCode.BAD_REQUEST,
  ): ApiResponse<null> {
    return ApiResponse.error(code, message)
  }

  protected deleted(
    message: ResponseMessage | string = ResponseMessage.DELETED,
    code: ResponseCode = ResponseCode.DELETED,
  ): ApiResponse<null> {
    return ApiResponse.deleted(code, message)
  }
}
