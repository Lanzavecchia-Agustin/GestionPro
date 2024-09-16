'use client';
import Header from '@/components/public/Header';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  BoxIcon,
  CreditCard,
  LineChart,
  ShoppingCart,
  Users,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

interface StatCardProps {
  number: string;
  text: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <motion.section
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary text-primary-foreground"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container px-4 md:px-6 mx-auto ">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div className="space-y-2">
                <motion.h1
                  className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  Revoluciona tu gestión comercial
                </motion.h1>
                <motion.p
                  className="mx-auto max-w-[700px] text-xl md:text-2xl text-primary-foreground/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Optimiza inventario, ventas, empleados y más. Todo en una
                  plataforma intuitiva y poderosa.
                </motion.p>
              </motion.div>
              <motion.div className="space-x-4 flex">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Link href="/signup">
                    <Button size="lg" variant="secondary">
                      Empezar Ahora <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    Ver Demo
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-background"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container px-4 md:px-6 mx-auto">
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8"
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
            >
              Características que Transforman tu Negocio
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<ShoppingCart className="h-10 w-10 text-primary" />}
                title="Control de Inventario Inteligente"
                description="Optimiza tu stock automáticamente y reduce costos de almacenamiento."
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-primary" />}
                title="Análisis de Ventas en Tiempo Real"
                description="Toma decisiones informadas con datos actualizados al instante."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Gestión de Empleados Simplificada"
                description="Mejora la productividad y satisfacción de tu equipo."
              />
              <FeatureCard
                icon={<LineChart className="h-10 w-10 text-primary" />}
                title="Conexión Seamless con Distribuidoras"
                description="Optimiza tu cadena de suministro con integraciones inteligentes."
              />
              <FeatureCard
                icon={<BoxIcon className="h-10 w-10 text-primary" />}
                title="Órdenes de Pedidos Automatizadas"
                description="Reduce errores y acelera el proceso de pedidos."
              />
              <FeatureCard
                icon={<CreditCard className="h-10 w-10 text-primary" />}
                title="Pagos Seguros a Distribuidoras"
                description="Gestiona transacciones con total transparencia y seguridad."
              />
            </div>
          </div>
        </motion.section>

        {/* Why Us Section */}
        <motion.section
          id="why-us"
          className="w-full py-12 md:py-24 lg:py-32 bg-secondary"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-secondary-foreground">
              ¿Por Qué Elegir GestiónPro?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <StatCard number="98%" text="de satisfacción del cliente" />
              <StatCard number="50%" text="de aumento en productividad" />
              <StatCard number="30%" text="de reducción en costos operativos" />
              <StatCard number="24/7" text="soporte técnico especializado" />
            </div>
          </div>
        </motion.section>

        {/* Pricing Section */}
        <motion.section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-background"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Planes Adaptados a tu Negocio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PricingCard
                title="Básico"
                price="$4.999 ARS"
                features={[
                  'Control de inventario',
                  'Gestión de ventas básica',
                  'Soporte por email',
                ]}
              />
              <PricingCard
                title="Pro"
                price="$7.999 ARS"
                features={[
                  'Todo lo del plan Básico',
                  'Análisis avanzado de ventas',
                  'Gestión de empleados',
                  'Soporte prioritario',
                ]}
                highlighted={true}
              />
              <PricingCard
                title="Enterprise"
                price="Personalizado"
                features={[
                  'Solución completa personalizada',
                  'Integraciones a medida',
                  'Soporte 24/7 dedicado',
                ]}
              />
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-background border-t border-border">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <BoxIcon className="h-6 w-6 mr-2 " />
            <span className="text-xl font-bold ">GestiónPro</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-sm text-muted-foreground hover:underline"
              href="#"
            >
              Términos de Servicio
            </Link>
            <Link
              className="text-sm text-muted-foreground hover:underline"
              href="#"
            >
              Política de Privacidad
            </Link>
            <Link
              className="text-sm text-muted-foreground hover:underline"
              href="#"
            >
              Contacto
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
      whileHover={{ scale: 1.15 }}
      whileInView={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-card-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}

function StatCard({ number, text }: StatCardProps) {
  return (
    <motion.div
      className="p-6 bg-secondary-foreground rounded-lg shadow-sm"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-4xl font-bold mb-2 text-secondary">{number}</h3>
      <p className="text-secondary/80">{text}</p>
    </motion.div>
  );
}

function PricingCard({
  title,
  price,
  features,
  highlighted = false,
}: PricingCardProps) {
  return (
    <motion.div
      className={`flex flex-col p-6 bg-card rounded-lg shadow-sm ${
        highlighted ? 'ring-2 ring-primary scale-105' : ''
      }`}
      whileHover={{ scale: 1.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-2xl font-bold mb-4 text-card-foreground">{title}</h3>
      <p className="text-4xl font-bold mb-6 text-card-foreground">
        {price}
        <span className="text-xl font-normal text-muted-foreground">/mes</span>
      </p>
      <ul className="mb-6 flex-grow">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center mb-2 text-muted-foreground"
          >
            <CheckCircle className="h-5 w-5 mr-2 text-primary" />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        className={`w-full ${
          highlighted
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : ''
        }`}
      >
        Elegir Plan
      </Button>
    </motion.div>
  );
}
