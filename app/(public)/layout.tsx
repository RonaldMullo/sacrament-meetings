import type { ReactNode } from "react";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({
  children,
}: PublicLayoutProps) {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8">
      {children}
    </main>
  );
}