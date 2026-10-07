import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: MeetingPageProps): Promise<Metadata> {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId)) {
    return {
      title: "Meeting Not Found | Sacrament Meeting Planner",
    };
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    return {
      title: "Meeting Not Found | Sacrament Meeting Planner",
    };
  }

  return {
    title: `${meeting.date} Meeting | Sacrament Meeting Planner`,
    description: `View the ${meeting.meetingType} sacrament meeting program for ${meeting.date}.`,
  };
}

export default async function MeetingPage({
  params,
}: MeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId)) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

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