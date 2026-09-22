import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8">
      {children}
    </main>
  );
}