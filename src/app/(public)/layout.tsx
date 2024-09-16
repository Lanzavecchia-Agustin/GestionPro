export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col flex-grow md:flex-row">
        <div className="flex items-center justify-center w-full h-2/6 md:h-full md:w-1/2 bg-primary">
          <h2 className="text-5xl font-bold text-secondary">Bienvenido</h2>
        </div>
        <div className="flex items-center justify-center w-full h-full md:w-1/2 bg-foreground">
          <main className="w-full max-w-md text-background">{children}</main>
        </div>
      </div>
    </div>
  );
}
