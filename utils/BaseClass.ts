import Logger from '@ioc:Adonis/Core/Logger'
import { configure } from './Settings'
import * as moment from 'moment'

export class BaseClass {
  protected _logger = Logger
  protected _settings = configure
  protected _moment = moment
}
