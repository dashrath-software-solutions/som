import Route from '@ioc:Adonis/Core/Route'
import EventsController from '../../../../app/Controllers/Http/Slack/EventsController'
import InteractiveController from '../../../../app/Controllers/Http/Slack/InteractiveController'
import SlashCommandsController from '../../../../app/Controllers/Http/Slack/SlashCommandsController'

const eventsController = new EventsController()
const interectiveController = new InteractiveController()
const slashCommandsController = new SlashCommandsController()

Route.group(() => {
  Route.group(() => {
    Route.post('challenge', eventsController.challenge)
  }).prefix('events')
  Route.group(() => {
    Route.post('method', interectiveController.method)
  }).prefix('interective')
  Route.group(() => {
    Route.post('meet', slashCommandsController.meet)
  }).prefix('commands')
}).prefix('v1/api/slack')
