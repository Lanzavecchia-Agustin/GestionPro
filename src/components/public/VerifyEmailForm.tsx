'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { createClient } from '@/utils/supabase/client'; // Import your client

export default function VerifyEmailForm() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Check if the user's email is verified by fetching the session
    async function checkVerification() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        toast({
          description: 'Error al obtener la sesión.',
          variant: 'destructive',
        });
        return;
      }

      // Check if the user's email is confirmed
      if (session?.user?.email_confirmed_at) {
        toast({
          description: 'Tu correo ha sido verificado exitosamente.',
        });
        router.push('/login'); // Redirect to login or dashboard after successful verification
      } else {
        toast({
          description: 'Hubo un error verificando tu correo.',
          variant: 'destructive',
        });
      }
    }

    checkVerification();
  }, [router, supabase]);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="mb-12 text-5xl font-bold text-center text-background">
          Verificando tu email...
        </h2>
        <p>Por favor, espera mientras verificamos tu email.</p>
      </div>
    </div>
  );
}
