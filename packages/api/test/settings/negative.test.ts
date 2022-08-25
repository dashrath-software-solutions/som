import { settings } from '@prisma/client'
import {
  SettingNotFoundError,
  SettingAlreadyExistsError,
  SettingsError,
  Settings,
} from '../../utils/Settings'
import { MockContext, Context, createMockContext } from '../../utils/test-utils/db-context'

describe('It will test the settings', () => {
  let set: Settings
  let mockCtx: MockContext
  let ctx: Context
  const mockVal: settings[] = [
    {
      id: BigInt(1),
      key: 'ENV1',
      value: 'VALUE1',
      status: true,
      createdAt: new Date('2022-08-19T18:04:36.191Z'),
      updatedAt: new Date('2022-08-19T18:04:36.191Z'),
    },
    {
      id: BigInt(2),
      key: 'ENV2',
      value: 'VALUE2',
      status: true,
      createdAt: new Date('2022-08-19T18:04:36.191Z'),
      updatedAt: new Date('2022-08-19T18:04:36.191Z'),
    },
  ]

  beforeEach(async () => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
    await ctx.prisma.$connect()
    set = new Settings(ctx.prisma)
    mockCtx.prisma.settings.findMany.mockResolvedValue(mockVal)
    await set.fetchSettings()
  })

  afterAll(async () => {
    await ctx.prisma.$disconnect()
  })

  it('getSetting will throw new SettingNotFoundError if key not found.', () => {
    try {
      set.getSetting('ENV3')
    } catch (e) {
      expect(e).toBeInstanceOf(SettingNotFoundError)
      expect(e.message).toEqual('ENV3 : did not found in the settings table.')
    }
  })

  it('updateSetting will throw new SettingNotFoundError if key not found.', () => {
    try {
      set.updateSetting('ENV3', 'VALUE3')
    } catch (e) {
      expect(e).toBeInstanceOf(SettingNotFoundError)
      expect(e.message).toEqual('ENV3 do not exists exists in the table.')
    }
  })

  it('setSetting will throw new SettingAlreadyExistsError if key not found.', () => {
    try {
      set.setSetting('ENV2', 'VALUE2')
    } catch (e) {
      expect(e).toBeInstanceOf(SettingAlreadyExistsError)
      expect(e.message).toEqual('ENV2 already exists in the table.')
    }
  })

  it('if setting not fetched it will throw SettingsError', () => {
    try {
      set = new Settings(ctx.prisma)
      mockCtx.prisma.settings.findMany.mockResolvedValue(mockVal)
      set.getSetting('ENV2')
    } catch (e) {
      expect(e).toBeInstanceOf(SettingsError)
      expect(e.message).toEqual(
        'Settings not fetched from database, please run fetchSettings before this function.'
      )
    }
  })
})
