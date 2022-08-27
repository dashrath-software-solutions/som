import Pino from 'pino'
import * as path from 'path'
import * as fs from 'fs'
import { Logger } from '../node_modules/@adonisjs/logger/build/src/Logger'

export const logFilePath = (suffix = '') => {
  const date = new Date()
  const addNewFolderNames = `${date.getFullYear()}/${date.getMonth() + 1}`
  const abssolutePathFolder = path.resolve(__dirname, '..', 'logs', addNewFolderNames)

  const fileName = `${date.getDate()}${suffix}.log`

  fs.mkdirSync(abssolutePathFolder, { recursive: true })

  const absolutePath = path.resolve(abssolutePathFolder, fileName)

  fs.appendFile(absolutePath, '', () => null)

  return absolutePath
}

export const writeFile = (suffix = '') =>
  fs.createWriteStream(logFilePath(suffix), {
    flags: 'a+',
    encoding: undefined,
    mode: 0o777,
  })
export const PinoLogger = Pino(
  {
    prettyPrint: {
      colorize: true,
      levelFirst: true,
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
      destination: writeFile('-global'),
    },
  },
  Pino.destination(writeFile('-global-1'))
)

const logger = new Logger({
  name: 'sop',
  level: 'trace',
  enabled: false,
})

export default logger
