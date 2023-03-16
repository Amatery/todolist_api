import express from 'express'
import { settings } from '../settings'
import { connectToDb } from './database/database-config'

const app = express()
const port = settings.PORT
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

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
