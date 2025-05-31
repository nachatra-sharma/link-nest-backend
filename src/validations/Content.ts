import { z } from 'zod/v4'

export const ContentPayload = z.object({
  title: z.string('Title is required filed'),
  content_type: z.string('Content ID is required'),
  isPublic: z.boolean(),
  content: z.string('Content is required'),
  user_id: z.string('User ID is required'),
})
