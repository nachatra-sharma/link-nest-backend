import express from 'express'
const router = express.Router()
import { handleSignup, handleSignin } from '../../controllers/Auth.js'
import { handleCreateContent } from '../../controllers/Content.js'
import { handleCreateTags } from '../../controllers/Tags.js'
import { handleLoggedInUser } from '../../middleware/handleLoggedInUser.js'
import { handlePermission } from '../../middleware/handlePermission.js'

// auth routes
router.post('/signup', handleSignup)
router.post('/signin', handleSignin)

// content routes
router.post('/content', handleCreateContent)

// tags routes
router.post(
  '/tags',
  handleLoggedInUser,
  handlePermission('admin'),
  handleCreateTags
)

export default router
