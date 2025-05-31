import type { Request, Response } from 'express'

export const handleCreateContent = (req: Request, res: Response) => {
  try {
    const { title, content_type, isPublic, content, user_id } = req.body
  } catch (error) {}
}
