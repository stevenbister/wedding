export type RSVPResponse = 'all_true' | 'some_true' | 'all_false' | 'no_response';

export function getRSVPResponseFromForm(
	responses: { rsvp: boolean | null }[] | undefined
): RSVPResponse {
	if (!responses || responses.length === 0) return 'no_response';

	if (responses.every((response) => response.rsvp === true)) {
		return 'all_true';
	} else if (responses.some((response) => response.rsvp === true)) {
		return 'some_true';
	} else {
		return 'all_false';
	}
}

interface PlusOneFormData {
	firstname: string;
	lastname: string;
	id?: string;
	'dietary-requirements'?: string;
}

interface GuestFormData {
	rsvp?: boolean | null;
	'dietary-requirements'?: string;
	message?: string;
	'plus-one'?: PlusOneFormData;
}

interface ParsedForm {
	guests: Record<string, GuestFormData>;
	message?: string;
}

export function parseRsvpFormData(formData: FormData): ParsedForm {
	const result: ParsedForm = { guests: {} };

	for (const [key, value] of formData.entries()) {
		if (key === 'message') {
			result.message = value.toString();
			continue;
		}

		const guestField = key.match(/^guests\[(.+?)\]\[(.+?)\]$/);
		const plusOneField = key.match(/^guests\[(.+?)\]\[plus-one\]\[(.+?)\]$/);

		if (plusOneField) {
			const [, guestId, field] = plusOneField;

			if (!result.guests[guestId]) {
				result.guests[guestId] = {};
			}

			const guest = result.guests[guestId];
			guest['plus-one'] = guest['plus-one'] ?? {};
			guest['plus-one'][field] = value.toString();
		} else if (guestField) {
			const [, guestId, rawField] = guestField;
			const field = rawField as keyof GuestFormData;

			if (!result.guests[guestId]) {
				result.guests[guestId] = {};
			}

			const guest = result.guests[guestId];

			if (field === 'rsvp') {
				if (value === 'accept') {
					guest.rsvp = true;
				} else if (value === 'decline') {
					guest.rsvp = false;
				} else {
					guest.rsvp = null;
				}
			} else {
				guest[field] = value.toString();
			}
		}
	}

	return result;
}
