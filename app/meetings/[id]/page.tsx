import Link from "next/link";
import { notFound } from "next/navigation";

import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MeetingPage({
  params,
}: MeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId)) {
    notFound();
  }

  const meeting = getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <section>
      <Link
        href="/meetings"
        className="mb-6 inline-block font-medium text-blue-700 hover:underline"
      >
        ← Back to meetings
      </Link>

      <MeetingDetail meeting={meeting} />
    </section>
  );
}