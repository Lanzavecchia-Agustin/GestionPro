'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Building2, Truck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function FillAccountDetailsForm() {
  const [userType, setUserType] = useState<'business' | 'distributor' | null>(
    null
  );
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [address, setAddress] = useState('');

  const handleContinue = () => {
    if (userType) {
      setStep(2);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative  rounded-lg shadow-lg w-full max-w-md p-6"
      >
        <Progress value={step === 1 ? 33 : 66} className="mb-4" />
        {step === 1 && (
          <>
            <div className="relative z-10">
              <div className="flex flex-col space-y-2 text-center mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Bienvenido a GestiónPro
                </h1>
                <h2 className="text-lg font-semibold tracking-tight">
                  Antes de comenzar, cuéntanos un poco sobre ti
                </h2>
                <p className="text-sm text-muted-foreground">
                  Selecciona una opción para continuar
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <Button
                  variant={userType === 'business' ? 'default' : 'outline'}
                  className="h-32 flex flex-col items-center justify-center"
                  onClick={() => setUserType('business')}
                >
                  <Building2 className="h-10 w-10 mb-2" />
                  <span>Soy un Negocio</span>
                </Button>
                <Button
                  variant={userType === 'distributor' ? 'default' : 'outline'}
                  className="h-32 flex flex-col items-center justify-center"
                  onClick={() => setUserType('distributor')}
                >
                  <Truck className="h-10 w-10 mb-2" />
                  <span>Soy una Distribuidora</span>
                </Button>
              </div>
              <Button
                className="w-full"
                disabled={!userType}
                onClick={handleContinue}
              >
                Continuar
              </Button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="relative z-10">
              <div className="flex flex-col space-y-2 text-center mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {userType === 'business'
                    ? 'Detalles del Negocio'
                    : 'Detalles de la Distribuidora'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Completa los datos para continuar
                </p>
              </div>

              <Input
                className="mb-4"
                placeholder="Nombre del titular"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
              <Input
                className="mb-4"
                placeholder={`Nombre del ${
                  userType === 'business' ? 'Negocio' : 'Distribuidora'
                }`}
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
              <Input
                className="mb-4"
                placeholder="Dirección del negocio"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <Button className="w-full">Finalizar</Button>
            </div>
          </>
        )}
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Al continuar, aceptas nuestros{' '}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Términos de servicio
          </a>{' '}
          y{' '}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Política de privacidad
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
}
