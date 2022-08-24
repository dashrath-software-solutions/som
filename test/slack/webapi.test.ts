import { SlackWebApi } from '../../packages/slack/web-api/WebApi.slack'
describe('It will test all the slack api', () => {
  let slack : SlackWebApi

  beforeEach(() => {
    slack = new SlackWebApi(String(process.env.SLACK_BOT_TOKEN))
  })

  it('should cient has to be defined', () => {
    expect(slack.client).toBeDefined()
  })

})
