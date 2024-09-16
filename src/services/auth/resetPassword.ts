// src/services/auth/resetPassword.ts
import { createClient } from '@/utils/supabase/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

export async function resetPassword({ password }: { password: string }) {
  const supabase = createClient();

  // Usamos el código para actualizar la contraseña
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Hook para manejar la mutación del restablecimiento de contraseña
export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast({
        description:
          'Contraseña restablecida con éxito. Ahora puedes iniciar sesión.',
      });
      // Redirigir al login
      window.location.href = '/login';
    },
    onError: (error: Error) => {
      toast({
        description:
          error.message || 'Hubo un error al restablecer la contraseña.',
        variant: 'destructive',
      });
    },
  });
};
