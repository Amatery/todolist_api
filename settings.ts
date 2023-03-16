import dotenv from 'dotenv'

dotenv.config()

export const settings = {
  PORT: process.env.PORT || 4004,
  CLUSTER_ACCESS_URL: process.env.CLUSTER_ACCESS_URL || 'mongodb://localhost:27017'
}
