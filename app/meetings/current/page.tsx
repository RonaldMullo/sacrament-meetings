"use client";

import { useEffect, useState } from "react";
import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";

function getMostRecentSunday(): string {
  const today = new Date();
  const sunday = new Date(today);

  sunday.setDate(today.getDate() - today.getDay());

  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, "0");
  const day = String(sunday.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function CurrentMeetingPage() {
  const [meeting, setMeeting] =
    useState<SacramentMeeting | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCurrentMeeting() {
      try {
        const date = getMostRecentSunday();

        const response = await fetch(
          `/api/meetings?date=${date}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch meeting");
        }

        const data: SacramentMeeting[] =
          await response.json();

        if (data.length === 0) {
          setError(
            "No sacrament meeting was found for the most recent Sunday."
          );
          return;
        }

        setMeeting(data[0]);
      } catch {
        setError("Unable to load the current meeting.");
      } finally {
        setLoading(false);
      }
    }

    loadCurrentMeeting();
  }, []);

  if (loading) {
    return (
      <p className="text-gray-600">
        Loading current meeting...
      </p>
    );
  }

  if (error || !meeting) {
    return (
      <section>
        <h1 className="text-3xl font-bold">
          Current Meeting
        </h1>

        <p className="mt-4 text-gray-600">
          {error}
        </p>
      </section>
    );
  }

  return <MeetingDetail meeting={meeting} />;
}