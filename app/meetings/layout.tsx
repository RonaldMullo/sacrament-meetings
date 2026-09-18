import type { ReactNode } from "react";

interface MeetingsLayoutProps {
  children: ReactNode;
}

export default function MeetingsLayout({
  children,
}: MeetingsLayoutProps) {
  return (
    <div className="mx-auto max-w-4xl">
      {children}
    </div>
  );
}