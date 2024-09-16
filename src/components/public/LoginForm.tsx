'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useLoginUser } from '@/services/auth/login'; // Importamos el nuevo hook de login
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Definir el esquema de validación con Zod
const formSchema = z.object({
  email: z.string().email({
    message: 'Por favor, ingrese un correo electrónico válido.',
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres.',
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function LoginForm() {
  const router = useRouter();
  const { mutate: login, status } = useLoginUser();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const isLoading = status === 'pending';

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    // Aquí manejamos el envío del formulario y realizamos la solicitud de inicio de sesión
    login(data);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Iniciar Sesión</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-11/12 space-y-4"
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

          <p className="text-sm text-muted-foreground">
            ¿Olvidaste tu contraseña?{' '}
            <Link href={'/forgot-password'}>Recuperar contraseña</Link>
          </p>

          <Button
            variant={'secondary'}
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-muted-foreground">
        ¿No tienes una cuenta?{' '}
        <Button
          variant="link"
          className="text-background"
          onClick={() => router.push('/signup')}
        >
          Registrarse
        </Button>
      </p>
    </>
  );
}
