// src/services/auth/signup.ts
import { createClient } from '@/utils/supabase/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export async function registerUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'http://localhost:3000/verify-email',
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const useRegisterUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast({
        description:
          'Registro exitoso. Por favor verifica tu correo electrónico.',
      });
      router.push('/verify-email');
    },
    onError: (error: Error) => {
      toast({
        description: error.message || 'Hubo un error al registrarte.',
        variant: 'destructive',
      });
    },
  });
};
