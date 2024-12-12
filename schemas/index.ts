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
  role: z.string().min(2, {
    message: 'El rol es inválido',
  }),
  description: z.string().min(2, {
    message: 'La descripción es inválida',
  }),
})

export const StudentSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre es inválido',
  }),
  lastName: z.string().min(2, {
    message: 'El apellido es inválido',
  }),
  studyYear: z.string().min(1, {
    message: 'El año es inválido',
  }),
  institute: z.string().min(2, {
    message: 'La institución es inválida',
  }),
  documentIdentity: z.string().min(2, {
    message: 'La identidad es inválida',
  }),
  dateOfBirth: z.string().min(1, {
    message: 'La fecha de nacimiento es inválida',
  }),
})

export const WorkshopSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre es inválido',
  }),
  day: z.array(z.string()).min(1, {
    message: 'Agrega al menos un día',
  }),
  description: z.string().min(2, {
    message: 'La descripción es inválida',
  }),
  teacherId: z.string().min(1, {
    message: 'Asigne un profesor a este taller',
  }),
})
