import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Logger from '@ioc:Adonis/Core/Logger'
import { configure } from '../utils/Settings'
import prisma from '../utils/Prisma'

export default class AppProvider {
  protected set: typeof configure
  constructor(protected app: ApplicationContract) {
    this.set = configure
  }

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    await this.set.fetchSettings()
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
