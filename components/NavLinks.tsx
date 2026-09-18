"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/meetings", label: "Meetings" },
  { href: "/meetings/current", label: "Current Meeting" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-wrap gap-4">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href === "/meetings" &&
              pathname.startsWith("/meetings/") &&
              pathname !== "/meetings/current");

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-medium transition-colors ${
                  isActive
                    ? "text-blue-700 underline"
                    : "text-gray-700 hover:text-blue-700"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}