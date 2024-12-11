import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string()
})

export type LoginInput = z.infer<typeof loginSchema>
export type User = z.infer<typeof userSchema>