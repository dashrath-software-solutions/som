import { settings } from '@prisma/client'
import { Settings } from '../../utils/Settings'
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

  const env3: settings = {
    id: BigInt(3),
    key: 'ENV3',
    value: 'VALUE3',
    status: true,
    createdAt: new Date('2022-08-19T18:04:36.191Z'),
    updatedAt: new Date('2022-08-19T18:04:36.191Z'),
  }

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

  it('It will fetch all the values from database', () => {
    expect(set.settings).toEqual({
      ENV1: 'VALUE1',
      ENV2: 'VALUE2',
    })
  })

  it('will get the values from database via key', () => {
    expect(set.getSetting('ENV1')).toEqual('VALUE1')
  })

  it('will set new key into the database with value', () => {
    mockCtx.prisma.settings.create.mockResolvedValue(env3)
    expect(set.setSetting(env3.key, env3.value)).toBeTruthy()
    expect(set.getSetting(env3.key)).toEqual(env3.value)
    expect(set.settings).toEqual({
      ENV1: 'VALUE1',
      ENV2: 'VALUE2',
      ENV3: 'VALUE3',
    })
  })

  it('will update the key value into the database', () => {
    const env2 = mockVal[1]
    env2.value = '2VAL'
    mockCtx.prisma.settings.update.mockResolvedValue(env2)
    expect(set.updateSetting(env2.key, env2.value)).toBeTruthy()
    expect(set.getSetting(env2.key)).toEqual(env2.value)
    expect(set.settings).toEqual({
      ENV1: 'VALUE1',
      ENV2: '2VAL',
    })
  })
})
