import Link from 'next/link';

export default function MeetingNotFound() {
  return (
    <section>
      <h1 className="text-3xl font-bold">
        Meeting not found
      </h1>

      <p className="mt-4">
        The meeting you are trying to edit does not exist.
      </p>

      <Link
        href="/meetings"
        className="mt-4 inline-block text-blue-600 underline"
      >
        Back to meetings
      </Link>
    </section>
  );
}