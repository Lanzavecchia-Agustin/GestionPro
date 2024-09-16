'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useResetPasswordMutation } from '@/services/auth/resetPassword'; // Importa el hook personalizado para resetear contraseña

// Validación con Zod para la nueva contraseña
const formSchema = z
  .object({
    password: z.string().min(6, {
      message: 'La contraseña debe tener al menos 6 caracteres.',
    }),
    confirmPassword: z.string().min(6, {
      message: 'Debes confirmar la contraseña.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  });

// Definir el tipo para los datos del formulario basado en el esquema de Zod
type FormSchemaType = z.infer<typeof formSchema>;

export default function ResetPasswordForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const { mutate: resetPassword, status } = useResetPasswordMutation(); // Usa el hook personalizado para la mutación

  // Definir el tipo de la función onSubmit correctamente
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    // Obtenemos el parámetro "code" de la URL en lugar de "access_token"
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code'); // Cambiado a 'code'

    if (code) {
      resetPassword({ password: data.password }); // Asegúrate de pasar tanto la contraseña como el código
    }
  };

  return (
    <div className="flex items-center w-11/12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">
            Restablecer Contraseña
          </h2>
          <p className="text-sm text-center text-muted-foreground">
            Ingresa tu nueva contraseña
          </p>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Nueva contraseña"
                    {...field}
                    className="text-foreground bg-background"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirmar contraseña"
                    {...field}
                    className="text-foreground bg-background"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            variant="secondary"
            disabled={status === 'pending'}
          >
            {status === 'pending'
              ? 'Restableciendo...'
              : 'Restablecer Contraseña'}
          </Button>

          <p className="text-sm text-center">
            <Link
              href="/login"
              className="text-[var(--primary)] hover:underline"
            >
              ← Volver a Iniciar Sesión
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
