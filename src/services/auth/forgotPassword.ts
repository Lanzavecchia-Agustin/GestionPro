// src/services/auth/resetPassword.ts
import { createClient } from '@/utils/supabase/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

// Función que envía el correo de recuperación de contraseña
export async function sendPasswordResetEmail(email: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:3000/reset-password', // La página a la que será redirigido para cambiar la contraseña
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Hook personalizado que utiliza React Query v5 para la mutación
export const useSendForgotPasswordEmail = () => {
  return useMutation({
    mutationFn: sendPasswordResetEmail, // Función de mutación
    onSuccess: () => {
      toast({
        description: 'Se ha enviado un enlace de recuperación a tu correo.',
      });
    },
    onError: (error: Error) => {
      toast({
        description:
          error.message || 'Hubo un error al enviar el enlace de recuperación.',
        variant: 'destructive',
      });
    },
  });
};
