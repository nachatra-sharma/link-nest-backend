import { z } from 'zod/v4'

export const ContentPayload = z.object({
  title: z.string('Title is required filed'),
})
