import express, { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../config/index.js'
import User from '../../model/user.js'
const router = express.Router()

router.post('/signup', async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password, email } = req.body
    console.log(username, password, email)
    // if user already exists
    // zod validation here
    const hashedPassword = jwt.sign(password, JWT_SECRET)
    console.log(hashedPassword)
    const createdUser = await User.create({
      username,
      password: hashedPassword,
      email,
    })
    return res.status(201).json({
      success: true,
      message: 'User has been created successfully',
      data: createdUser,
      error: {},
    })
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: {},
      message: 'Something went wrong in signup',
      error: {
        error,
      },
    })
  }
})

export default router
