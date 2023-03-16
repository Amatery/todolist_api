import { WithId } from 'mongodb'
import { TodoViewModel } from '../models/todo-models/todo-view-model'

export const getTodosViewModel = (todo: WithId<TodoViewModel> | TodoViewModel): TodoViewModel => {
  return {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    createdAt: todo.createdAt,
    status: todo.status,
  }
}
