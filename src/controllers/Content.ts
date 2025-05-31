import type { Request, Response } from 'express'
import { ContentPayload } from '../validations/Content.js'
import Content from '../model/content.js'

export const handleCreateContent = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { title, content_type, isPublic, content } = req.body
    const user_id = req.user?.id
    const result = ContentPayload.safeParse({
      title,
      content_type,
      isPublic,
      content,
      user_id,
    })
    if (!result.success) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Validation Failed',
        error: {
          message: result.error.message,
        },
      })
    }
    const createdContent = await Content.create({
      title,
      content_type,
      isPublic: isPublic || false,
      content,
      user_id,
    })
    return res.status(200).json({
      success: true,
      message: 'Successfully added new content',
      data: { createdContent },
      error: {},
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Something went wrong while creating content',
      data: {},
      error: {
        error,
      },
    })
  }
}

export const handleGetContent = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const content = await Content.find({})
    return res.status(200).json({
      success: true,
      message: 'Successfully fetched all the content',
      data: {
        content,
      },
      error: {},
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Something went wrong while fetching content',
      data: {},
      error: {
        error,
      },
    })
  }
}
