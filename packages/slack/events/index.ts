import { createEventAdapter } from '@slack/events-api'
import { configure } from '../../../utils/Settings'

const slackEvents = createEventAdapter(String(configure.getSetting('SIGNING_SECRET')))

export default slackEvents
