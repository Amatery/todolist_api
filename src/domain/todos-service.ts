import { randomUUID } from 'crypto'
import { DeleteResult } from 'mongodb'
import { todoStatutes } from '../helpers/todo-statutes'
import { TodoViewModel } from '../models/todo-models/todo-view-model'
import { todosRepository } from '../repositories/todos-repository'

export const todosService = {
  async getTodos(): Promise<TodoViewModel[]> {
    return todosRepository.getTodos()
  },
  async createTodo(title: string, description: string): Promise<TodoViewModel> {
    const newTodo = {
      id: randomUUID(),
      title,
      description,
      createdAt: new Date().toISOString(),
      status: todoStatutes.UNCOMPLETED,
    }
    return todosRepository.createTodo(newTodo)
  },
  async deleteTodoById(id: string) {
    return todosRepository.deleteTodoById(id)
  },
  async deleteAllTodos(): Promise<DeleteResult> {
    return todosRepository.deleteAllTodos()
  },
  async updateTodoById(id: string, title: string, description: string, status: string): Promise<boolean> {
    return todosRepository.updateTodoById(id, title, description, status)
  },
}
