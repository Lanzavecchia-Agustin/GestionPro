import { createClient } from '@/utils/supabase/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const useLoginUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast({
        description: 'Inicio de sesión exitoso.',
      });
      router.push('/dashboard');
    },
    onError: (error: Error) => {
      toast({
        description: error.message || 'Hubo un error al iniciar sesión.',
        variant: 'destructive',
      });
    },
  });
};
