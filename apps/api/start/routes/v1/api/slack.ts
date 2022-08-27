import Route from '@ioc:Adonis/Core/Route'
import EventsController from '../../../../app/Controllers/Http/Slack/EventsController'
import InteractiveController from '../../../../app/Controllers/Http/Slack/InteractiveController'
import SlashCommandsController from '../../../../app/Controllers/Http/Slack/SlashCommandsController'
import FetchClickUpController from '../../../../app/Controllers/Http/Slack/Schedule/FetchClickUpController'

const eventsController = new EventsController()
const interectiveController = new InteractiveController()
const slashCommandsController = new SlashCommandsController()
const fetchClickUpController = new FetchClickUpController()

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
  Route.group(() => {
    Route.get('click-up-tasks', fetchClickUpController.getTaskAndRedirectToTheSlack)
  }).prefix('cron')
}).prefix('v1/api/slack')
