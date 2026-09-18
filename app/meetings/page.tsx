"use client";

import { useEffect, useState } from "react";
import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<SacramentMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMeetings() {
      try {
        const response = await fetch("/api/meetings");

        if (!response.ok) {
          throw new Error("Failed to fetch meetings");
        }

        const data: SacramentMeeting[] = await response.json();
        setMeetings(data);
      } catch {
        setError("Unable to load sacrament meetings.");
      } finally {
        setLoading(false);
      }
    }

    loadMeetings();
  }, []);

  if (loading) {
    return (
      <p className="text-gray-600">
        Loading meetings...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-700">
        {error}
      </p>
    );
  }

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Sacrament Meetings
        </h1>

        <p className="mt-2 text-gray-600">
          Review recent sacrament meeting programs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
          />
        ))}
      </div>
    </section>
  );
}