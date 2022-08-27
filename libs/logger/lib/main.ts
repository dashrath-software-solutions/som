import { ConsoleLogger, LogLevel } from '@nestjs/common'
import { yellow } from '@nestjs/common/utils/cli-colors.util'
import * as fs from 'fs'
import * as path from 'path'

class CustomLogger extends ConsoleLogger {
  private _shouldWriteToTheFile = false
  private _pathToWrite: string = __dirname
  private _fileName = () => this.setCurrentDate()
  private _logLevel : LogLevel = 'verbose'

  set pathToWrite(path: string) {
    this.debug('LOG FILE ' + path)
    this._pathToWrite = path
  }

  set shouldWriteToThePath(should: boolean) {
    this._shouldWriteToTheFile = should
  }

  setLevel(level: any): void {
    this.setLogLevels([level])
  }

  info = this.log

  getLevel = () : any => this._logLevel

  setName = this.setContext

  /**
   * Returns the currrent date.
   * @returns string
   */
  setCurrentDate(): string {
    const date = new Date(Date.now())
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.log`
  }

  /**
   * Write messages to file.
   * @param message string
   * @returns  void
   */
  writeMessageToFile(message: string) {
    const resolvePath = path.resolve(this._pathToWrite, this._fileName())
    fs.appendFile(resolvePath, message, err => {
      if (err) {
        console.error(err.message, err)
        process.exit(1)
      }
    })
  }

  /**
   * Creates PID
   * @param pid number
   * @returns string
   */
  formatPid(pid: number) {
    return `[slack] ${pid}  - `
  }

  printMessages(
    messages: unknown[],
    context?: string,
    logLevel: LogLevel = 'log',
    writeStreamType?: 'stdout' | 'stderr',
  ) {
    messages.forEach(message => {
      const pidMessage = this.formatPid(process.pid)
      const contextMessage = context ? yellow(`[${context}] `) : ''
      const timestampDiff = ''
      const formattedLogLevel = logLevel.toUpperCase().padStart(7, ' ')
      const formattedMessage = this.formatMessage(
        logLevel,
        message,
        pidMessage,
        formattedLogLevel,
        contextMessage,
        timestampDiff,
      )
      if (this._shouldWriteToTheFile) {
        this.writeMessageToFile(formattedMessage)
      } else {
        process[writeStreamType ?? 'stdout'].write(formattedMessage)
      }
    })
  }

  constructor(context: string) {
    super(context)
  }
}

const logger = new CustomLogger('App')
logger.pathToWrite = path.resolve(__dirname, '..', '..', '..', 'logs')

export { logger }
