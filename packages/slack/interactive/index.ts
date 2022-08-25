import { createMessageAdapter } from '@slack/interactive-messages'
import { configure } from '../../../utils/Settings'

const slackInteractions = createMessageAdapter(String(configure.getSetting('SIGNING_SECRET')))

export default slackInteractions
