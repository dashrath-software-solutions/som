import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Logger from '@ioc:Adonis/Core/Logger'

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
    Logger.info('App is ready.')
  }

  public async shutdown() {
    // Cleanup, since app is going down
    Logger.error('App is going down. (.)(.)')
  }
}
