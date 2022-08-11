import Pino from 'pino'
import * as path from 'path'
import * as fs from 'fs'
import { Logger } from '../node_modules/@adonisjs/logger/build/src/Logger'

export const logFilePath = () => {
  const date = new Date()
  const addNewFolderNames = `${date.getFullYear()}/${date.getMonth() + 1}`
  const abssolutePathFolder = path.resolve(__dirname, '..', 'logs', addNewFolderNames)

  const fileName = `${date.getDate()}.log`

  fs.mkdirSync(abssolutePathFolder, { recursive: true })

  const absolutePath = path.resolve(abssolutePathFolder, fileName)

  fs.appendFile(absolutePath, '', (err) => {
    if (err) {
      console.error(err.message, err)
      process.exit(1)
    }
  })

  return absolutePath
}

export const writeFile = () =>
  fs.createWriteStream(logFilePath(), {
    flags: 'a+',
    encoding: undefined,
    mode: 0o777,
  })
const PinoLogger = Pino(
  {
    prettyPrint: {
      colorize: true,
      levelFirst: true,
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
    },
  },
  Pino.destination(writeFile())
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
