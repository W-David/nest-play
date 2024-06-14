import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { Response } from 'express'
import * as moment from 'moment'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')

    let code = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Internal server error'

    if (exception instanceof HttpException) {
      code = exception.getStatus()
      message = exception.getResponse()['message'] || exception.message
    } else if (exception instanceof BadRequestException) {
      code = exception.getStatus()
      message = exception.getResponse()['message'][0] || exception.message
    } else {
      code = HttpStatus.INTERNAL_SERVER_ERROR
      message = (exception as Error).message || 'Internal server error'
    }

    const responseBody = {
      code,
      timestamp,
      message,
    }

    httpAdapter.reply(response, responseBody, code)
  }
}
