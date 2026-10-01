'use client';

import Link from 'next/link';

type MeetingsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function MeetingsError({
  error,
  reset,
}: MeetingsErrorProps) {
  console.error(error);

  return (
    <section>
      <h1 className="text-3xl font-bold">
        Something went wrong
      </h1>

      <p className="mt-4">
        We could not complete your request. Please try again.
      </p>

      <div className="mt-6 flex gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded bg-blue-700 px-4 py-2 text-white"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded border border-gray-300 px-4 py-2"
        >
          Back to meetings
        </Link>
      </div>
    </section>
  );
}