import { MongoClient } from 'mongodb'
import { settings } from '../../settings'
import { TodoViewModel } from '../models/todo-models/todo-view-model'


const client = new MongoClient(settings.CLUSTER_ACCESS_URL)


export const todosCollection = client.db().collection<TodoViewModel>('todos')

export const connectToDb = async () => {
  try {
    await client.connect()
    console.log('✅ Connected successfully to cluster')
  } catch (e) {
    console.log(`👎 Something went wrong ${e}`)
    await client.close()
  }
}
