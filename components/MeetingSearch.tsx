"use client";

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export default function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentQuery = searchParams.get("query") ?? "";
  const [term, setTerm] = useState(currentQuery);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleSearch(value: string) {
    setTerm(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set("query", value.trim());
      } else {
        params.delete("query");
      }

      // Solo una búsqueda nueva vuelve a la página 1.
      params.set("page", "1");

      router.replace(`${pathname}?${params.toString()}`);
    }, 300);
  }

  return (
    <div className="mb-6">
      <label
        htmlFor="meeting-search"
        className="mb-2 block font-medium"
      >
        Search meetings
      </label>

      <input
        id="meeting-search"
        type="search"
        aria-label="Search meetings"
        placeholder="Speaker, presiding, conducting, or meeting type"
        value={term}
        onChange={(event) => handleSearch(event.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2"
      />
    </div>
  );
}