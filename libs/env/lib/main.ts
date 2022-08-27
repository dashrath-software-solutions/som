import * as fs from 'fs'
import { logger } from '../../logger/lib/main'
import * as path from 'path'

export const availableEnv = {
  PRODUCTION: 'PRODUCTION',
  DEVELOPMENT: 'DEVELOPMENT',
  STAGING: 'STAGING',
  PREPROD: 'PREPROD',
}

/**
 * Will returns the environment variables from the machine you can also returns the default property if not found
 * @param name {string}
 * @param def string
 * @returns string
 */
export const getEnv = (name: string, def = ''): string => {
  try {
    const upperName = name.toUpperCase()
    const env = process.env[upperName] ?? def
    if (!env) {
      const envPath = envFile(
        process.env['ENV'] ?? (availableEnv.DEVELOPMENT as any),
      )
      throw new Error(`in ${envPath} file '${upperName}' not found.`)
    }
    return env
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

export type IAvailableEnv = keyof typeof availableEnv

export const currentEnv = () =>
  getEnv('ENV', availableEnv.DEVELOPMENT) as IAvailableEnv

export const isPreprod = () => currentEnv() === availableEnv.PREPROD

export const isProduction = () => currentEnv() === availableEnv.PRODUCTION

export const isStaging = () => currentEnv() === availableEnv.STAGING

export const isDevelopment = () => currentEnv() === availableEnv.DEVELOPMENT

export const envFile = (stage: IAvailableEnv) => {
  const envPath = `.env.${stage}`.toLowerCase()
  const currentFile = __dirname + '../../../' + envPath
  return path.resolve(currentFile)
}

/**
 * It will load the .env file and set the environment variables
 * @param stage {IAvailableEnv}
 */
export const loadEnv = (stage?: IAvailableEnv) => {
  try {
    if (!stage) {
      stage = currentEnv()
    }
    const envFilePath = envFile(stage)

    if (!fs.existsSync(envFilePath)) {
      throw new Error(`${envFilePath} not found.`)
    }
    logger.log(`Loading ${envFilePath}`)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config({ path: envFilePath, override: true })
  } catch (e) {
    logger.error(e)
    process.exit(1)
  }
}

/**
 * Will returns the environment variables from the machine you can also returns the default property if not found
 * @param should should be loaded or not
 * @param stage {IAvailableEnv}
 */
export const loadLegacyEnv = (should = true, stage?: IAvailableEnv) => {
  if (should) {
    const envfilepath = path.join(__dirname, '..', '..', '..', '.env')
    logger.log(`Loading environment from ${envfilepath}`)
    //eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config({ path: envfilepath, override: true })
  } else {
    loadEnv(stage)
  }
}