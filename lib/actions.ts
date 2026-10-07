'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  createMeeting as createMeetingDb,
  updateMeeting as updateMeetingDb,
  deleteMeeting as deleteMeetingDb,
  getMeetingById,
} from './meetings-db';
import { auth } from '@/auth';

async function requireAuth() {
  const session = await auth();

  if (!session?.user) {
    throw new Error('You must be signed in to perform this action.');
  }
}

const MeetingSchema = z.object({
  date: z.string().min(1, 'Please select a meeting date.'),
  meetingType: z.enum([
    'testimony',
    'regular',
    'stake',
    'general',
    'special',
  ]),
  presiding: z.string().min(1, 'Please enter who is presiding.'),
  conducting: z.string().min(1, 'Please enter who is conducting.'),

  openingHymnNumber: z.coerce
    .number()
    .int()
    .positive('Please enter a valid hymn number.'),
  openingHymnTitle: z.string().min(1, 'Please enter the opening hymn title.'),
  openingPrayer: z.string().min(1, 'Please enter the opening prayer.'),

  sacramentHymnNumber: z.coerce
    .number()
    .int()
    .positive('Please enter a valid hymn number.'),
  sacramentHymnTitle: z.string().min(1, 'Please enter the sacrament hymn title.'),

  closingHymnNumber: z.coerce
    .number()
    .int()
    .positive('Please enter a valid hymn number.'),
  closingHymnTitle: z.string().min(1, 'Please enter the closing hymn title.'),
  closingPrayer: z.string().min(1, 'Please enter the closing prayer.'),
});
export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    openingHymnNumber?: string[];
    openingHymnTitle?: string[];
    openingPrayer?: string[];
    sacramentHymnNumber?: string[];
    sacramentHymnTitle?: string[];
    closingHymnNumber?: string[];
    closingHymnTitle?: string[];
    closingPrayer?: string[];
  };
  message?: string | null;
};

export async function createMeeting(
  prevState: State,
  formData: FormData
): Promise<State> {
  await requireAuth();

  const validatedFields = MeetingSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors in the form.',
    };
  }

  const data = validatedFields.data;

  try {
    await createMeetingDb({
      date: data.date,
      meetingType: data.meetingType,
      presiding: data.presiding,
      conducting: data.conducting,
      announcements: [],
      openingHymn: {
        number: data.openingHymnNumber,
        title: data.openingHymnTitle,
      },
      openingPrayer: data.openingPrayer,
      wardBusiness: [],
      stakeBusiness: false,
      sacramentHymn: {
        number: data.sacramentHymnNumber,
        title: data.sacramentHymnTitle,
      },
      speakers: [],
      closingHymn: {
        number: data.closingHymnNumber,
        title: data.closingHymnTitle,
      },
      closingPrayer: data.closingPrayer,
    });
  } catch (error) {
    console.error('Failed to create meeting:', error);
    throw new Error(
      'Unable to create the meeting. Please try again.'
    );
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}
export async function updateMeeting(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {
  await requireAuth();

  const validatedFields = MeetingSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors in the form.',
    };
  }

  const data = validatedFields.data;

try {
  const existingMeeting = await getMeetingById(id);

  if (!existingMeeting) {
    throw new Error('Meeting not found.');
  }

  await updateMeetingDb(id, {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,

    announcements: existingMeeting.announcements,

    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },

    openingPrayer: data.openingPrayer,

    wardBusiness: existingMeeting.wardBusiness,
    stakeBusiness: existingMeeting.stakeBusiness,

    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },

    speakers: existingMeeting.speakers,

    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },

    closingPrayer: data.closingPrayer,
  });
} catch (error) {
  console.error('Failed to update meeting:', error);
  throw new Error(
    'Unable to update the meeting. Please try again.'
  );
}

revalidatePath('/meetings');
redirect('/meetings');
}

export async function deleteMeeting(id: number): Promise<void> {
  await requireAuth();

  try {
    await deleteMeetingDb(id);
  } catch (error) {
    console.error('Failed to delete meeting:', error);
    throw new Error(
      'Unable to delete the meeting. Please try again.'
    );
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}