import linkNestRoute from './linknest-route'
import express from 'express'
const router = express.Router()

router.use('/linknest', linkNestRoute)

export default router
