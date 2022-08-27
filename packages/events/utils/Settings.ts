import prisma from './Prisma'

export interface ISettings {
  key: string
  value: string
}

export type ISet = {
  [k: string]: string
}

export class SettingsError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class SettingNotFoundError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class SettingAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class Settings {
  private _prisma: typeof prisma
  private _settings: ISet = {}
  private _fetched = false

  get settings() {
    this.confirmIfFetched()
    return this._settings
  }

  constructor(conn?: typeof prisma) {
    this._prisma = conn ?? prisma
  }

  private async getSettingsFromDatabase(): Promise<ISettings[]> {
    const settings = await this._prisma.settings.findMany({
      where: {
        status: true,
      },
      select: {
        key: true,
        value: true,
      },
    })
    return settings
  }

  private async setSettingsIntoTheDatabase(key: string, value: string) {
    await this._prisma.settings.create({
      data: {
        key,
        value,
      },
    })
    return true
  }

  private async updateSettingsIntoTheDatabase(key: string, value: string) {
    await this._prisma.settings.update({
      where: {
        key: key,
      },
      data: {
        value: value,
      },
    })
    return true
  }

  private mapSettingsComingFromDB(settings: ISettings[]): ISet {
    const data: ISet = {}

    settings.forEach((val) => {
      data[val.key] = val.value
    })

    return data
  }

  private confirmIfFetched() {
    if (!this._fetched) {
      throw new SettingsError(
        `Settings not fetched from database, please run fetchSettings before this function.`
      )
    }
  }

  public async fetchSettings() {
    const settings = await this.getSettingsFromDatabase()
    const mappedSet = this.mapSettingsComingFromDB(settings)
    this._settings = mappedSet
    this._fetched = true
    return mappedSet
  }

  public getSetting(key: string) {
    this.confirmIfFetched()

    const set = this._settings[key]

    if (!set) {
      throw new SettingNotFoundError(`${key} : did not found in the settings table.`)
    }

    return set
  }

  public setSetting(key: string, val: string) {
    this.confirmIfFetched()
    const found = this._settings[key]

    if (found) {
      throw new SettingAlreadyExistsError(`${key} already exists in the table.`)
    }
    this._settings[key] = val
    this.setSettingsIntoTheDatabase(key, val)
    return true
  }

  public updateSetting(key: string, val: string) {
    this.confirmIfFetched()
    const found = this._settings[key]

    if (!found) {
      throw new SettingNotFoundError(`${key} do not exists exists in the table.`)
    }
    this._settings[key] = val
    this.updateSettingsIntoTheDatabase(key, val)
    return true
  }
}

const configure = new Settings()
export { configure }
