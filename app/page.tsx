import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="py-12 text-center">
      <Image
        src="/sacrament-meeting.png"
        alt="Globe icon representing the sacrament meeting planner"
        width={200}
        height={200}
        className="mx-auto mb-6"
      />

      <h1 className="text-4xl font-bold text-gray-900">
        Sacrament Meeting Planner
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
        A simple application for viewing and organizing sacrament
        meeting programs.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/meetings"
          className="rounded-md bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
        >
          View Meetings
        </Link>

        <Link
          href="/meetings/current"
          className="rounded-md border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-800 hover:bg-gray-50"
        >
          Current Meeting
        </Link>
      </div>
    </section>
  );
}