// src/app/(public)/signup/page.tsx
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
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRegisterUser } from '@/services/auth/signup'; // Usamos el hook desde services
import { useRouter } from 'next/navigation';

// Definir el esquema de validación con Zod para solo email y contraseña
const formSchema = z.object({
  email: z.string().email({
    message: 'Por favor, ingrese un correo electrónico válido.',
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres.',
  }),
});

// Definir el tipo de los datos del formulario basado en el esquema de Zod
type FormSchemaType = z.infer<typeof formSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const { mutate, status } = useRegisterUser(); // Usamos el hook para registrar usuario

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Registro de Usuario</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-11/12 mt-4 space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="tu-email@ejemplo.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant={'secondary'}
            type="submit"
            className="w-full"
            disabled={status === 'pending'} // Desactivar el botón si la mutación está en progreso
          >
            {status === 'pending' ? 'Registrando...' : 'Registrarse'}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground">
          ¿Ya tienes una cuenta?{' '}
          <Button
            variant="link"
            className="text-background"
            onClick={() => router.push('/login')}
          >
            Iniciar sesión
          </Button>
        </p>
      </Form>
    </>
  );
}
