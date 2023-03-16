import express from 'express'
import cors from 'cors'
import { settings } from '../settings'
import { connectToDb } from './database/database-config'
import { todosRouter } from './routes/todos-router'

const app = express()
const port = settings.PORT
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)
app.use(cors())

app.use('/todos', todosRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const startServer = async () => {
  await connectToDb()
  app.listen(port, () => {
    console.log(`🚀🚀🚀🚀 App listening on ${port}`)
  })
}


startServer().then(r => r)
