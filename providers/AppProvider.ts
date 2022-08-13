import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Logger from '@ioc:Adonis/Core/Logger'
import prisma from '../utils/Prisma'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
    await prisma.$connect()
    Logger.info('App is ready.')
  }

  public async shutdown() {
    // Cleanup, since app is going down
    await prisma.$disconnect()
    Logger.error('App is going down. (.)(.)')
  }
}
