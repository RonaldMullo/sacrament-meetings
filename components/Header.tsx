import Link from "next/link";
import NavLinks from "./NavLinks";
import LogoutButton from "./LogoutButton";
import { auth } from "@/auth";

export default async function Header() {
  const session = await auth();

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900"
            >
              Sacrament Meeting Planner
            </Link>

            <p className="mt-1 text-sm text-gray-600">
              Quito Ward · {currentDate}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <NavLinks />

            {session?.user ? (
              <LogoutButton />
            ) : (
              <Link
                href="/login"
                className="font-medium text-gray-700 transition-colors hover:text-blue-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}