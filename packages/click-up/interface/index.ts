export interface IFileteredTeamTasks {
  team_id?: number
  page?: number
  order_by?: 'id' | 'created' | 'due_date' | 'updated'
  reverse?: boolean
  subtasks?: boolean
  space_ids?: string[]
  project_ids?: string[]
  list_ids?: string[]
  statuses?: string[]
  include_closed?: string
  assignees?: string[]
  tags?: string[]
  due_date_gt?: Date // Unix time in milliseconds
  date_created_gt?: Date // Unix time in milliseconds
  date_created_lt?: Date // Unix time in milliseconds
  date_updated_gt?: Date // Unix time in milliseconds
  date_updated_lt?: Date // Unix time in milliseconds
  custom_fields?: object[]
  custom_task_ids?: string
}

export interface ClickUpRequestError {
  err: string
  ECODE: string
}

export interface TaskStatus {
  status: string
  color: string
  type: string
  orderindex: string
}

export interface TaskCreator {
  id: number
  username: string
  color: string
  email: string
  profilePicture: string
}

export interface TaskTags {
  name: string
  tag_fg: string
  tag_bg: string
  creator: number
}

export interface TaskPriority {
  id: number
  priority: string
  color: string
  orderindex: string
}

export interface TaskCustomFieldsTypeConfigOptions {
  id: string
  label: string
  color: string
}

export interface TaskCustomFieldsTypeConfig {
  options: TaskCustomFieldsTypeConfigOptions[]
}

export interface TaskCustomFields {
  id: string
  name: string
  type: string
  date_created: string
  hide_from_guests: boolean | false
  required: boolean | false
  type_config: TaskCustomFieldsTypeConfig
}

export interface TaskDependencies {
  task_id: string
  depends_on: string
  type: number
  date_created: string
  workspace_id: string | null
}

export interface TaskLists {
  access: boolean
  id: string
  name: string
}

export interface TasksProject {
  access: boolean
  hidden: boolean
  id: string
  name: string
}

export interface TasksSpace {
  id: string
}

export interface TasksList {
  id: string
  custom_id: string
  text_content: string
  description: string
  status: TaskStatus
  orderindex: string
  date_created: string
  date_updated: string
  date_closed: string | null
  archived: boolean | false
  creator: TaskCreator
  assignees: TaskCreator[]
  watchers: TaskCreator[]
  checklist: object[]
  tags: TaskTags[]
  parent: object | null
  priority: TaskPriority
  due_date: string | null
  start_date: string | null
  points: any | null
  time_estimates: string | null
  custom_fields: TaskCustomFields
  dependencies: TaskDependencies[]
  linked_tasks: object[]
  team_id: string
  url: string
  permission_level: string
  lists: TaskLists
  project: TasksProject
  folder: TasksProject
  space: TasksSpace
}

export type ClickUpRequestSuccessFilteredTasksList = {
  // tasks: TasksList[]
  [key: string]: any
}
