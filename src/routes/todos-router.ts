import { Request, Response, Router } from 'express'
import { DeleteResult } from 'mongodb'
import { todosService } from '../domain/todos-service'
import { STATUS_CODES } from '../helpers/status-codes'
import { TodoInputModel } from '../models/todo-models/todo-input-model'
import { TodoQueryModel } from '../models/todo-models/todo-query-model'
import { TodoViewModel } from '../models/todo-models/todo-view-model'
import { RequestWithBody, RequestWithParams } from '../types/types'

export const todosRouter = Router({})


todosRouter.get('/', async (req: Request, res: Response<TodoViewModel[]>) => {
  const result = await todosService.getTodos()
  if (!result) {
    res.sendStatus(STATUS_CODES.NOT_FOUND)
    return
  }
  res.status(STATUS_CODES.OK).json(result)
})

todosRouter.post('/', async (req: RequestWithBody<TodoInputModel>, res: Response<TodoViewModel>) => {
  const {
    title,
    description,
  } = req.body
  const createdTodo = await todosService.createTodo(title, description)
  res.status(STATUS_CODES.CREATED).json(createdTodo)

})

todosRouter.delete('/:id', async (req: RequestWithParams<TodoQueryModel>, res: Response) => {
  const { id } = req.params
  const result = await todosService.deleteTodoById(id)
  if (!result) {
    res.sendStatus(STATUS_CODES.NOT_FOUND)
    return
  }
  res.sendStatus(STATUS_CODES.NO_CONTENT)
})

/** FOR TESTING PURPOSES **/
todosRouter.delete('/', async (req: Request, res: Response<DeleteResult>) => {
  const result = await todosService.deleteAllTodos()
  if (!result) {
    res.sendStatus(STATUS_CODES.BAD_REQUEST)
    return
  }
  res.sendStatus(STATUS_CODES.NO_CONTENT)
})
/** /FOR TESTING PURPOSES **/
