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
    const tags = await Tag.findOne({
      tag,
    })
    if (tags._id) {
      return res.status(400).json({
        success: false,
        message: 'Tag is already present with this name',
        data: {},
        error: {
          nmessage: 'Already in database',
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
    return res.status(400).json({
      success: false,
      message: 'Something went wrong while creating tags',
      data: {},
      error: {
        error,
      },
    })
  }
}

export const handleGetTags = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const tags = await Tag.find({})
    return res.status(200).json({
      succcess: true,
      message: 'Successfully fetched all the tags',
      data: {
        tags: tags,
      },
      error: {},
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Something went wrong while fetching tags',
      data: {},
      error: {
        error,
      },
    })
  }
}

export const handleDeleteTags = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const params = req.params
    if (!params.id) {
      return res.status(400).json({
        success: false,
        message: 'Id is not valid',
        data: {},
        error: {
          message: 'Id is not valid',
        },
      })
    }
    const deletedTag = await Tag.findOneAndDelete({
      _id: params.id,
    })
    if (!deletedTag._id) {
      return res.status(400).json({
        success: false,
        message: 'Id is not valid',
        data: {},
        error: {
          message: 'Id is not valid',
        },
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Tag has been successfully deleted',
      data: {
        tag: deletedTag,
      },
      error: {},
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Something went wrong while deleting tags',
      data: {},
      error: {
        error,
      },
    })
  }
}
