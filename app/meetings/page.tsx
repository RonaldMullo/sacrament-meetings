import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

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
  const mostRecentSunday = getMostRecentSunday();
  const meeting = getMeetings(mostRecentSunday)[0];

  if (!meeting) {
    redirect("/meetings");
  }

  redirect(`/meetings/${meeting.id}`);
}