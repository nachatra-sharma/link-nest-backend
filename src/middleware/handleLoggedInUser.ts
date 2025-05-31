import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/index.js'

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string
      role: string
    }
  }
}

export const handleLoggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.headers.authorization
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        data: {},
        error: {
          message: "You're not logged in",
        },
        message: "You're not logged in",
      })
    }
    const access_token = token?.split(' ')[1]
    if (!access_token) {
      return res.status(401).json({
        success: false,
        data: {},
        error: {
          message: "You're not logged in",
        },
        message: "You're not logged in",
      })
    }
    const verify = jwt.verify(access_token, JWT_SECRET) as {
      id: string
      role: string
    }
    if (!verify) {
      return res.status(401).json({
        success: false,
        data: {},
        error: {
          message: "You're not logged in",
        },
        message: "You're not logged in",
      })
    }
    req.user = verify
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: {},
      error: {
        error,
      },
      message: 'Something went wrong please try again later',
    })
  }
}
