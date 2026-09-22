import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const sql = neon(process.env.DATABASE_POSTGRES_URL!);

type MeetingRow = {
  id: number;
  date: string | Date;
  meeting_type: SacramentMeeting["meetingType"];
  presiding: string;
  conducting: string;
  announcements: string[];
  opening_hymn: SacramentMeeting["openingHymn"];
  opening_prayer: string;
  ward_business: SacramentMeeting["wardBusiness"];
  stake_business: boolean;
  sacrament_hymn: SacramentMeeting["sacramentHymn"];
  speakers: SacramentMeeting["speakers"];
  closing_hymn: SacramentMeeting["closingHymn"];
  closing_prayer: string;
};

function mapMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date:
      row.date instanceof Date
        ? row.date.toISOString().split("T")[0]
        : String(row.date).split("T")[0],
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers ?? [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

export async function getMeetings(
  date?: string | null
): Promise<SacramentMeeting[]> {
  let rows;

  if (date) {
    rows = await sql`
      SELECT *
      FROM meetings
      WHERE date = ${date}
      ORDER BY date DESC
    `;
  } else {
    rows = await sql`
      SELECT *
      FROM meetings
      ORDER BY date DESC
    `;
  }

  return (rows as MeetingRow[]).map(mapMeeting);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT *
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

  if (rows.length === 0) {
    return null;
  }

  return mapMeeting(rows[0] as MeetingRow);

  
}

export async function searchMeetings(
  query: string,
  page: number
): Promise<SacramentMeeting[]> {
  const pageSize = 5;
  const offset = (page - 1) * pageSize;
  const searchTerm = `%${query}%`;

  const rows = await sql`
    SELECT *
    FROM meetings
    WHERE
      ${query} = ''
      OR presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${pageSize}
    OFFSET ${offset}
  `;

  return (rows as MeetingRow[]).map(mapMeeting);
}

export async function getMeetingsPageCount(
  query: string
): Promise<number> {
  const pageSize = 5;
  const searchTerm = `%${query}%`;

  const rows = await sql`
    SELECT COUNT(*)::int AS count
    FROM meetings
    WHERE
      ${query} = ''
      OR presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;

  const count = Number(rows[0].count);

  return Math.ceil(count / pageSize);
}