import express from 'express'
import ApiRoute from './routes'
import { PORT, DB_URL } from './config'
import connectToDB from './db'
const app = express()

app.use('/api', ApiRoute)

app.listen(PORT, async () => {
  console.log(`Server is up and running on PORT ${PORT}`)
  await connectToDB(DB_URL)
})
