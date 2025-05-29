import express from 'express'
const router = express.Router()
import { handleSignup, handleSignin } from '../../controllers/Auth.js'

router.post('/signup', handleSignup)
router.post('/signin', handleSignin)
export default router
