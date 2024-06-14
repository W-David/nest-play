import * as chalk from 'chalk'
import { NextFunction, Request, Response } from 'express'
import * as moment from 'moment'

export function LoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
  const logMessage = `${chalk.gray('[')}${chalk.blueBright(timestamp)}${chalk.gray(']')} ${chalk.greenBright(req.method)} ${chalk.cyanBright(req.baseUrl + req.path)}\n${chalk.yellow('Request Body:')} ${JSON.stringify(req.body, null, 2)}`
  console.log(logMessage)
  next()
}
