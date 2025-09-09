import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common'
import { Response } from 'express'
import { ApiResponse } from '../dto/api-response.dto'
import { ResponseCode } from '../enums/response-code.enum'
import { ResponseMessage } from '../enums/response-message.enum'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let status: ResponseCode = ResponseCode.INTERNAL_ERROR
    let message: ResponseMessage | string = ResponseMessage.INTERNAL_ERROR

    if (exception instanceof HttpException) {
      status = exception.getStatus() as ResponseCode
      const res: any = exception.getResponse()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      message =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res?.message || exception.message || this.mapStatusToMessage(status)
    }

    response.status(status).json(new ApiResponse(status, message))
  }

  private mapStatusToMessage(status: ResponseCode): ResponseMessage {
    switch (status) {
      case ResponseCode.BAD_REQUEST:
        return ResponseMessage.BAD_REQUEST
      case ResponseCode.UNAUTHORIZED:
        return ResponseMessage.UNAUTHORIZED
      case ResponseCode.FORBIDDEN:
        return ResponseMessage.FORBIDDEN
      case ResponseCode.NOT_FOUND:
        return ResponseMessage.NOT_FOUND
      default:
        return ResponseMessage.INTERNAL_ERROR
    }
  }
}
