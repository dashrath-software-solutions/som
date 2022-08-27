import { logFilePath, writeFile } from '../../utils/Logger'

describe('Logger file Positive', () => {
  it('will return the absolute path', () => {
    const path = logFilePath()
    expect(path).toBeTruthy()
  })

  it('will return write writeStream', () => {
    const stream = writeFile()
    expect(stream).toBeDefined()
  })
})
