import CreateMeetingForm from './create-form';

export default function NewMeetingPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold">
        Create New Meeting
      </h1>

      <div className="mt-6">
        <CreateMeetingForm />
      </div>
    </section>
  );
}