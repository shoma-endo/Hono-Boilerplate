import { z } from 'zod'

export const validateRequest = async <T>(
  schema: z.Schema<T>,
  data: unknown
): Promise<z.SafeParseReturnType<unknown, T>> => {
  return schema.safeParseAsync(data)
}