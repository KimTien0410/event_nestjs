// src/common/interceptors/transform.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { ApiResponse } from '../dto/api-response.dto'
import { ResponseCode } from '../enums/response-code.enum'
import { ResponseMessage } from '../enums/response-message.enum'

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        return new ApiResponse(
          ResponseCode.SUCCESS,
          ResponseMessage.SUCCESS,
          data,
        )
      }),
    )
  }
}
