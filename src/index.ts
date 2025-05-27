import express from 'express'
import ApiRoute from './routes/index.js'
import { PORT, DB_URL } from './config/index.js'
import connectToDB from './db/index.js'
const app = express()

app.use(express.json())
app.use('/api', ApiRoute)

const startServer = async () => {
  try {
    await connectToDB(DB_URL)
    app.listen(PORT, () => {
      console.log(`Server is up and running on PORT ${PORT}`)
    })
  } catch (error) {
    console.log('Something went wrong while running the server.')
  }
}

startServer()
