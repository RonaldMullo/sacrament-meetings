import Link from "next/link";

import {
  getMeetingsPageCount,
  searchMeetings,
} from "@/lib/meetings-db";
import MeetingSearch from "@/components/MeetingSearch";

interface MeetingsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;

  const query = params.query?.trim() ?? "";
  const requestedPage = Number(params.page ?? "1");
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const [meetings, totalPages] = await Promise.all([
    searchMeetings(query, currentPage),
    getMeetingsPageCount(query),
  ]);

  return (
    <section>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Sacrament Meetings</h1>

        <Link
          href="/meetings/new"
          className="rounded bg-blue-700 px-4 py-2 text-white"
        >
          New Meeting
        </Link>
      </div>

      <p className="mb-6 text-gray-600">
        Search and browse sacrament meeting programs.
      </p>
    <MeetingSearch />
      <div className="space-y-4">
        {meetings.length === 0 ? (
          <p>No meetings found.</p>
        ) : (
          meetings.map((meeting) => (
            <article
              key={meeting.id}
              className="rounded border border-gray-200 p-4"
            >
              <Link
                href={`/meetings/${meeting.id}`}
                className="text-lg font-semibold text-blue-700 hover:underline"
              >
                {meeting.date}
              </Link>

              <p className="mt-1 capitalize">
                {meeting.meetingType} meeting
              </p>

              <p className="text-sm text-gray-600">
                Presiding: {meeting.presiding}
              </p>

              <p className="text-sm text-gray-600">
                Conducting: {meeting.conducting}
              </p>
            </article>
          ))
        )}
      </div>

      <nav
  aria-label="Pagination"
  className="mt-6 flex items-center justify-between"
>
  {currentPage > 1 ? (
    <Link
      href={`/meetings?${new URLSearchParams({
        ...(query ? { query } : {}),
        page: String(currentPage - 1),
      }).toString()}`}
      className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-50"
    >
      Previous
    </Link>
  ) : (
    <span />
  )}

  <span className="text-sm text-gray-600">
    Page {currentPage} of {Math.max(totalPages, 1)}
  </span>

  {currentPage < totalPages ? (
    <Link
      href={`/meetings?${new URLSearchParams({
        ...(query ? { query } : {}),
        page: String(currentPage + 1),
      }).toString()}`}
      className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-50"
    >
      Next
    </Link>
  ) : (
    <span />
  )}
</nav>
    </section>
  );
}