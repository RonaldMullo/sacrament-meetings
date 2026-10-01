import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';
import EditMeetingForm from './edit-form';

type EditMeetingPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
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
    <h1 className="text-3xl font-bold">
      Edit Meeting
    </h1>

    <div className="mt-6">
      <EditMeetingForm meeting={meeting} />
    </div>
  </section>
);
}