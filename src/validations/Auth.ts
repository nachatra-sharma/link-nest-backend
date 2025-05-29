import { z } from 'zod/v4'
export const SignupPayload = z.object({
  username: z
    .string('Username is required field')
    .min(10, { error: 'Username must have atleast 10 character' })
    .max(50, { error: 'Username is too big' })
    .toLowerCase(),
  password: z
    .string('Password is required field')
    .min(10, {
      error: 'Password have atleast 10 character',
    })
    .max(20, { error: 'Password is too big' }),
  email: z.email('Enter a valid email'),
})
