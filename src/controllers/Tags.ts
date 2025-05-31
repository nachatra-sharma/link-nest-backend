import { Request, Response } from 'express'
import Tag from '../model/tags.js'

export const handleCreateTags = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { tag } = req.body
    if (!tag) {
      return res.status(400).json({
        success: false,
        message: 'Invalid tag name',
        data: {},
        error: {
          message: 'Invalid tag name',
        },
      })
    }
    const currentTag = await Tag.create({
      tag,
    })
    return res.status(200).json({
      success: true,
      message: 'Tag created successfully',
      data: {
        tag: currentTag,
      },
      error: {},
    })
  } catch (error) {
    return res.status(402).json({
      success: false,
      message: 'Something went wrong while creating tags',
      data: {},
      error: {
        error,
      },
    })
  }
}
