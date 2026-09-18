import type { SacramentMeeting } from "@/lib/types";
import PrintButton from "./PrintButton";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  const formattedDate = new Date(
    `${meeting.date}T12:00:00`
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <header className="mb-8 border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold text-gray-900">
          Sacrament Meeting
        </h1>

        <p className="mt-2 text-lg text-gray-600">
          {formattedDate}
        </p>

        <p className="mt-1 capitalize text-gray-600">
          {meeting.meetingType} meeting
        </p>
        <div className="mt-5">
  <PrintButton />
</div>
      </header>

      <div className="space-y-6">
        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Leadership
          </h2>

          <p>
            <strong>Presiding:</strong> {meeting.presiding}
          </p>

          <p>
            <strong>Conducting:</strong> {meeting.conducting}
          </p>
        </section>

        {meeting.announcements &&
          meeting.announcements.length > 0 && (
            <section>
              <h2 className="mb-2 text-xl font-semibold">
                Announcements
              </h2>

              <ul className="list-disc pl-5">
                {meeting.announcements.map((announcement) => (
                  <li key={announcement}>{announcement}</li>
                ))}
              </ul>
            </section>
          )}

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Opening
          </h2>

          <p>
            <strong>Opening Hymn:</strong>{" "}
            {meeting.openingHymn.number} –{" "}
            {meeting.openingHymn.title}
          </p>

          <p>
            <strong>Opening Prayer:</strong>{" "}
            {meeting.openingPrayer}
          </p>
        </section>

        {meeting.wardBusiness.length > 0 && (
          <section>
            <h2 className="mb-2 text-xl font-semibold">
              Ward Business
            </h2>

            <ul className="list-disc pl-5">
              {meeting.wardBusiness.map((item, index) => (
                <li key={index}>{item.description}</li>
              ))}
            </ul>
          </section>
        )}

        {meeting.stakeBusiness && (
          <section>
            <h2 className="mb-2 text-xl font-semibold">
              Stake Business
            </h2>

            <p>Stake business will be conducted.</p>
          </section>
        )}

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Sacrament
          </h2>

          <p>
            <strong>Sacrament Hymn:</strong>{" "}
            {meeting.sacramentHymn.number} –{" "}
            {meeting.sacramentHymn.title}
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Program
          </h2>

          <div className="space-y-3">
            {meeting.speakers.map((speaker, index) => (
              <div
                key={`${speaker.name}-${index}`}
                className="rounded-md bg-gray-50 p-3"
              >
                <p className="font-semibold">
                  {speaker.name}
                </p>

                <p className="text-gray-600">
                  {speaker.type === "musical-number"
                    ? "Musical Number"
                    : `Topic: ${speaker.topic}`}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Closing
          </h2>

          <p>
            <strong>Closing Hymn:</strong>{" "}
            {meeting.closingHymn.number} –{" "}
            {meeting.closingHymn.title}
          </p>

          <p>
            <strong>Closing Prayer:</strong>{" "}
            {meeting.closingPrayer}
          </p>
        </section>
      </div>
    </article>
  );
}