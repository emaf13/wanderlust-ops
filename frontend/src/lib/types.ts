import { z } from 'zod';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'El correo electrónico es requerido' })
    .regex(emailRegex, 'Correo electrónico inválido'),
  password: z.string().min(1, { message: 'La contraseña es requerida' }),
});

export const signUpSchema = z
  .object({
    username: z.string().min(1, { message: 'El nombre de usuario es requerido' }),
    email: z
      .string()
      .min(1, { message: 'El correo electrónico es requerido' })
      .regex(emailRegex, 'Correo electrónico inválido'),
    password: z.string().min(1, { message: 'La contraseña es requerida' }),
    confirmPassword: z.string().min(1, { message: 'Confirmar contraseña es requerido' }),
  })
  .refine((data) => data.username.trim().length >= 5, {
    message: 'El nombre de usuario debe tener al menos 5 caracteres',
    path: ['username'],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })
  .refine((data) => data.password.trim().length >= 8, {
    message: 'La contraseña debe tener al menos 8 caracteres',
    path: ['password'],
  });

export type TSignInSchema = z.infer<typeof signInSchema>;
export type TSignUpSchema = z.infer<typeof signUpSchema>;
