import { DeleteResult } from 'mongodb'
import { todosCollection } from '../database/database-config'
import { getTodosViewModel } from '../helpers/getTodosViewModel'
import { TodoViewModel } from '../models/todo-models/todo-view-model'

export const todosRepository = {
  async getTodos(): Promise<TodoViewModel[]> {
    const todos = await todosCollection.find({}).toArray()
    return todos.map(t => getTodosViewModel(t))
  },
  async createTodo(newTodo: TodoViewModel): Promise<TodoViewModel> {
    await todosCollection.insertOne(newTodo)
    return getTodosViewModel(newTodo)
  },
  async deleteTodoById(id: string): Promise<DeleteResult> {
    return todosCollection.deleteOne({ id })
  },
  async deleteAllTodos(): Promise<DeleteResult> {
    return todosCollection.deleteMany({})
  },
  async updateTodoById(id: string, title: string, description: string, status: string): Promise<boolean> {
    const updatedTodo = await todosCollection.updateOne(
      { id },
      {
        $set: {
          title,
          description,
          status,
        },
      },
    )
    return updatedTodo.matchedCount === 1
  },
}
