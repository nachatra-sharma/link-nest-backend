import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../model/user.js'
import { JWT_SECRET, SALT_ROUND } from '../config/index.js'
import { SigninPayload, SignupPayload } from '../validations/Auth.js'
import bcrypt from 'bcrypt'

export const handleSignup = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { username, password, email } = req.body
    const result = SignupPayload.safeParse({ username, password, email })

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

    const isAlreadyExist = await User.findOne({
      $or: [{ email }, { username }],
    })

    if (isAlreadyExist && isAlreadyExist.email === email) {
      return res.status(409).json({
        success: false,
        data: {},
        message: 'Conflict occured',
        error: {
          message: 'User Already Exist',
        },
      })
    }

    if (isAlreadyExist && isAlreadyExist.username === username) {
      return res.status(409).json({
        success: false,
        data: {},
        message: 'Conflict occured',
        error: {
          message: 'Username Already Exist',
        },
      })
    }

    const salt = bcrypt.genSaltSync(SALT_ROUND)
    const hashPassword = bcrypt.hashSync(password, salt)
    const createdUser = await User.create({
      username,
      password: hashPassword,
      email,
    })

    const access_token = jwt.sign({ id: createdUser._id }, JWT_SECRET)

    return res.status(201).json({
      success: true,
      message: 'User has been created successfully',
      data: {
        user_id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
        access_token: access_token,
      },
      error: {},
    })
  } catch (error) {
    return res.status(402).json({
      success: false,
      data: {},
      message: 'Something went wrong in signup',
      error: {
        error,
      },
    })
  }
}

export const handleSignin = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { username, password } = req.body
    const result = SigninPayload.safeParse({ username, password })
    if (!result.success) {
      return res.status(409).json({
        success: false,
        data: {},
        message: 'Validation Failed',
        error: {
          message: result.error.message,
        },
      })
    }
    const isUserExist = await User.findOne({
      username,
    })
    if (!isUserExist) {
      return res.status(402).json({
        success: false,
        data: {},
        message: "User doesn't exist",
        error: 'Invalid Credentails',
      })
    }
    const isPasswordValid = bcrypt.compareSync(password, isUserExist.password)
    if (!isPasswordValid) {
      return res.status(402).json({
        success: false,
        data: {},
        message: 'Invalid Credentails',
        error: {
          message: 'Invalid Credentails',
        },
      })
    }
    const access_token = jwt.sign({ id: isUserExist._id }, JWT_SECRET)
    return res.status(200).json({
      success: true,
      data: {
        username: isUserExist.username,
        access_token,
        email: isUserExist.email,
      },
      message: 'Sucessfully Logged In',
      error: {},
    })
  } catch (error) {
    return res.status(402).json({
      success: false,
      data: {},
      message: 'Something went wrong in signin',
      error: {
        error,
      },
    })
  }
}
