import express from 'express'
const router = express.Router()
import { handleSignup } from '../../controllers/Auth.js'

router.post('/signup', handleSignup)

export default router
