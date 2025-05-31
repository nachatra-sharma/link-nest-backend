import express from 'express'
const router = express.Router()
import { handleSignup, handleSignin } from '../../controllers/Auth.js'
import { handleCreateContent } from '../../controllers/Content.js'
import {
  handleCreateTags,
  handleGetTags,
  handleDeleteTags,
} from '../../controllers/Tags.js'
import { handleLoggedInUser } from '../../middleware/handleLoggedInUser.js'
import { handlePermission } from '../../middleware/handlePermission.js'

// auth routes
router.post('/signup', handleSignup)
router.post('/signin', handleSignin)

// content routes
router.post('/content', handleCreateContent)

// tags routes
router.get('/tags', handleGetTags)

router.post(
  '/tags',
  handleLoggedInUser,
  handlePermission('admin'),
  handleCreateTags
)

router.delete(
  '/tags/:id',
  handleLoggedInUser,
  handlePermission('admin'),
  handleDeleteTags
)
export default router
