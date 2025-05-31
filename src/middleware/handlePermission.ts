import type { NextFunction, Request, Response } from 'express'

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string
      role: string
    }
  }
}

export const handlePermission = (requiredRole: string) => {
  return async function permission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user = req.user
      if (!user || !user.role) {
        return res.status(401).json({
          success: false,
          data: {},
          message: 'You are not authorized user',
          error: {
            message: 'You are not authorized user',
          },
        })
      }
      if (user.role !== requiredRole) {
        return res.status(401).json({
          success: false,
          data: {},
          message: 'You are not authorized user',
          error: {
            message: 'You are not authorized user',
          },
        })
      }
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
}
