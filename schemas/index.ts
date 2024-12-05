import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'El email es inválido',
  }),
  password: z.string().min(8, {
    message: 'La contraseña debe tener al menos 8 caracteres',
  }),
})

export const UserSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre es inválido',
  }),
  lastName: z.string().min(2, {
    message: 'El apellido es inválido',
  }),
  email: z.string().email({
    message: 'El email es inválido',
  }),
  password: z.string().min(8, {
    message: 'La contraseña debe tener al menos 8 caracteres',
  }),
  documentIdentity: z.string().min(2, {
    message: 'La identidad es inválida',
  }),
  role: z.enum(['DIRECTIVE', 'ADMIN', 'TEACHER', 'STUDENT', 'DEVELOPER'], {
    message: 'El rol es inválido',
  }),
  description: z.string().min(2, {
    message: 'La descripción es inválida',
  }),
})
