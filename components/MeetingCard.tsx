import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(
    `${meeting.date}T12:00:00`
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {formattedDate}
          </h2>

          <p className="mt-1 capitalize text-gray-600">
            {meeting.meetingType} meeting
          </p>
        </div>

        {meeting.stakeBusiness && (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            Stake
          </span>
        )}
      </div>

      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Presiding:</strong> {meeting.presiding}
        </p>

        <p>
          <strong>Conducting:</strong> {meeting.conducting}
        </p>

        <p>
          <strong>Speakers:</strong> {meeting.speakers.length}
        </p>
      </div>

      <Link
        href={`/meetings/${meeting.id}`}
        className="mt-5 inline-block font-semibold text-blue-700 hover:underline"
      >
        View program →
      </Link>
    </article>
  );
}