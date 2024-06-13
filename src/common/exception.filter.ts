import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch (exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const timestemp = new Date().toISOString()

    response.status(status).json({
      statusCode: status,
      timestamp: timestemp.split('T')[0] + ' ' + timestemp.split('T')[1].split('.')[0],
      message: exception.message,
    })
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch (exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()
    const timestemp = new Date().toISOString()

    const httpStatus = exception instanceof HttpException? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const responseBody = {
      statusCode: httpStatus,
      timestamp: timestemp.split('T')[0] + ' ' + timestemp.split('T')[1].split('.')[0],
      message: exception instanceof HttpException ? exception.message : 'Internal server error'
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
   }
}