import { Request, Response, Router } from 'express'
import { DeleteResult } from 'mongodb'
import { todosService } from '../domain/todos-service'
import { STATUS_CODES } from '../helpers/status-codes'
import { inputValidationMiddleware } from '../middlewares/input-validation-middleware'
import { validateDescription, validateTitle } from '../middlewares/todo-body-validators'
import { TodoInputModel } from '../models/todo-models/todo-input-model'
import { TodoViewModel } from '../models/todo-models/todo-view-model'
import { URIParamsTodoIdModel } from '../models/todo-models/URIParamsTodoIdModel'
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from '../types/types'

export const todosRouter = Router({})


todosRouter.get('/', async (req: Request, res: Response<TodoViewModel[]>) => {
  const result = await todosService.getTodos()
  if (!result) {
    res.sendStatus(STATUS_CODES.NOT_FOUND)
    return
  }
  res.status(STATUS_CODES.OK).json(result)
})

todosRouter.post(
  '/',
  validateTitle,
  validateDescription,
  inputValidationMiddleware,
  async (req: RequestWithBody<TodoInputModel>, res: Response<TodoViewModel>) => {
    const {
      title,
      description,
    } = req.body
    const createdTodo = await todosService.createTodo(title, description)
    res.status(STATUS_CODES.CREATED).json(createdTodo)

  },
)

todosRouter.put('/:id', async (req: RequestWithParamsAndBody<URIParamsTodoIdModel, TodoInputModel>, res: Response) => {
  const { id } = req.params
  const {
    title,
    description,
    status,
  } = req.body
  const updatedTodo = await todosService.updateTodoById(id, title, description, status)
  if (!updatedTodo) {
    res.sendStatus(STATUS_CODES.NOT_FOUND)
    return
  }
  res.sendStatus(STATUS_CODES.NO_CONTENT)
})

todosRouter.delete('/:id', async (req: RequestWithParams<URIParamsTodoIdModel>, res: Response<DeleteResult>) => {
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
