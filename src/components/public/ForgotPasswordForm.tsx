'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { useSendForgotPasswordEmail } from '@/services/auth/forgotPassword'; // Importa el hook personalizado

// Validación con Zod
const formSchema = z.object({
  email: z.string().email({
    message: 'Por favor, ingrese un correo electrónico válido.',
  }),
});

export function ForgotPasswordForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const { mutate: sendForgotPasswordEmail, status } =
    useSendForgotPasswordEmail(); // Usa el hook personalizado

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    // Llamamos a la mutación para enviar el correo de recuperación
    sendForgotPasswordEmail(data.email);
  };

  return (
    <div className="flex items-center w-11/12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">
            Recuperar Contraseña
          </h2>
          <p className="text-sm text-center text-muted-foreground">
            Ingresa tu correo para recibir un enlace de recuperación
          </p>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Tu correo electrónico"
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
            variant={'secondary'}
            disabled={status === 'pending'} // Desactivamos el botón si la mutación está en progreso
          >
            {status === 'pending' ? 'Enviando...' : 'Enviar'}
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
