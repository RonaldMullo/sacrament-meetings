'use client';

import { useActionState } from 'react';
import { createMeeting, type State } from '@/lib/actions';

const initialState: State = {
  message: null,
  errors: {},
};

export default function CreateMeetingForm() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialState
  );

  const inputClass =
    'w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200';

  const labelClass = 'block font-medium text-gray-900';

  const errorClass = 'text-sm text-red-700';

  return (
    <form
      action={formAction}
      className="mt-6 max-w-2xl space-y-6"
    >
      <div className="space-y-2">
        <label htmlFor="date" className={labelClass}>
          Meeting Date
        </label>

        <input
          id="date"
          name="date"
          type="date"
          aria-describedby="date-error"
          className={inputClass}
        />

        <div
          id="date-error"
          aria-live="polite"
          className={errorClass}
        >
          {state.errors?.date?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="meetingType" className={labelClass}>
          Meeting Type
        </label>

        <select
          id="meetingType"
          name="meetingType"
          defaultValue=""
          aria-describedby="meetingType-error"
          className={inputClass}
        >
          <option value="" disabled>
            Select a meeting type
          </option>
          <option value="testimony">Testimony</option>
          <option value="regular">Regular</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
          <option value="special">Special</option>
        </select>

        <div
          id="meetingType-error"
          aria-live="polite"
          className={errorClass}
        >
          {state.errors?.meetingType?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="presiding" className={labelClass}>
          Presiding
        </label>

        <input
          id="presiding"
          name="presiding"
          type="text"
          aria-describedby="presiding-error"
          className={inputClass}
        />

        <div
          id="presiding-error"
          aria-live="polite"
          className={errorClass}
        >
          {state.errors?.presiding?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="conducting" className={labelClass}>
          Conducting
        </label>

        <input
          id="conducting"
          name="conducting"
          type="text"
          aria-describedby="conducting-error"
          className={inputClass}
        />

        <div
          id="conducting-error"
          aria-live="polite"
          className={errorClass}
        >
          {state.errors?.conducting?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="openingHymnNumber"
          className={labelClass}
        >
          Opening Hymn Number
        </label>

        <input
          id="openingHymnNumber"
          name="openingHymnNumber"
          type="number"
          min="1"
          aria-describedby="openingHymnNumber-error"
          className={inputClass}
        />

        <div
          id="openingHymnNumber-error"
          aria-live="polite"
          className={errorClass}
        >
          {state.errors?.openingHymnNumber?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="openingHymnTitle"
          className={labelClass}
        >
          Opening Hymn Title
        </label>

        <input
          id="openingHymnTitle"
          name="openingHymnTitle"
          type="text"
          aria-describedby="openingHymnTitle-error"
          className={inputClass}
        />

        <div
          id="openingHymnTitle-error"
          aria-live="polite"
          className={errorClass}
        >
          {state.errors?.openingHymnTitle?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="openingPrayer" className={labelClass}>
          Opening Prayer
        </label>

        <input
          id="openingPrayer"
          name="openingPrayer"
          type="text"
          aria-describedby="openingPrayer-error"
          className={inputClass}
        />

        <div
          id="openingPrayer-error"
          aria-live="polite"
          className={errorClass}
        >
          {state.errors?.openingPrayer?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="sacramentHymnNumber"
          className={labelClass}
        >
          Sacrament Hymn Number
        </label>

        <input
          id="sacramentHymnNumber"
          name="sacramentHymnNumber"
          type="number"
          min="1"
          aria-describedby="sacramentHymnNumber-error"
          className={inputClass}
        />

        <div
          id="sacramentHymnNumber-error"
          aria-live="polite"
          className={errorClass}
        >
          {state.errors?.sacramentHymnNumber?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="sacramentHymnTitle"
          className={labelClass}
        >
          Sacrament Hymn Title
        </label>

        <input
          id="sacramentHymnTitle"
          name="sacramentHymnTitle"
          type="text"
          aria-describedby="sacramentHymnTitle-error"
          className={inputClass}
        />

        <div
          id="sacramentHymnTitle-error"
          aria-live="polite"
          className={errorClass}
        >
          {state.errors?.sacramentHymnTitle?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="closingHymnNumber"
          className={labelClass}
        >
          Closing Hymn Number
        </label>

        <input
          id="closingHymnNumber"
          name="closingHymnNumber"
          type="number"
          min="1"
          aria-describedby="closingHymnNumber-error"
          className={inputClass}
        />

        <div
          id="closingHymnNumber-error"
          aria-live="polite"
          className={errorClass}
        >
          {state.errors?.closingHymnNumber?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="closingHymnTitle"
          className={labelClass}
        >
          Closing Hymn Title
        </label>

        <input
          id="closingHymnTitle"
          name="closingHymnTitle"
          type="text"
          aria-describedby="closingHymnTitle-error"
          className={inputClass}
        />

        <div
          id="closingHymnTitle-error"
          aria-live="polite"
          className={errorClass}
        >
          {state.errors?.closingHymnTitle?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="closingPrayer" className={labelClass}>
          Closing Prayer
        </label>

        <input
          id="closingPrayer"
          name="closingPrayer"
          type="text"
          aria-describedby="closingPrayer-error"
          className={inputClass}
        />

        <div
          id="closingPrayer-error"
          aria-live="polite"
          className={errorClass}
        >
          {state.errors?.closingPrayer?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      {state.message && (
        <p
          aria-live="polite"
          className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? 'Creating...' : 'Create Meeting'}
      </button>
    </form>
  );
}