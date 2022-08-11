import Pino from 'pino'
import * as path from 'path'
import * as fs from 'fs'
import { Logger } from '../node_modules/@adonisjs/logger/build/src/Logger'

export const logFilePath = () => {
  const date = new Date()
  const filename = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.log`
  return path.resolve(__dirname, '..', 'logs', filename)
}

export const writeFile = () => fs.createWriteStream(logFilePath())

const PinoLogger = Pino(
  {
    prettyPrint: {
      colorize: true,
      levelFirst: true,
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
    },
  },
  Pino.destination(logFilePath())
)

const logger = new Logger(
  {
    name: 'sop',
    level: 'trace',
    enabled: true,
  },
  PinoLogger
)

export default logger
