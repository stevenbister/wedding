import { isProd } from '$lib/utils/is-prod';
import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { flags } from '$constants/flags';
import { Guests } from '$lib/server/queries/Guests';
import { parseRsvpFormData } from '$/lib/utils/rsvp-helpers';

export const load: PageServerLoad = async ({ params }) => {
	if (!flags.inviteReady && isProd) {
		redirect(307, '/save-the-date');
	}

	const guestId = params.guestId;

	if (!guestId) {
		return error(404);
	}

	const guests = new Guests();
	const guest = await guests.getById(guestId);
	const partner = guest.partnerId ? await guests.getPartner(guestId) : null;

	return {
		guest,
		partner
	};
};

export const actions = {
	rsvp: async ({ request }) => {
		const formData = await request.formData();
		const parsedData = parseRsvpFormData(formData);

		if (Object.keys(parsedData.guests).length === 0) {
			return fail(400, {
				error: true,
				message: 'Please RSVP before submitting the form'
			});
		}

		const guests = new Guests();

		if (parsedData.message !== undefined) {
			const [guestId] = Object.keys(parsedData.guests);
			await guests.addMessage(guestId, parsedData.message);
		}

		const guestResponses = [];

		for (const [guestId, responseData] of Object.entries(parsedData.guests)) {
			if (responseData['dietary-requirements']) {
				await guests.addDietaryRequirements(guestId, responseData['dietary-requirements']);
			}

			if (responseData['plus-one']) {
				await guests.addPlusOne(guestId, {
					firstName: responseData['plus-one'].firstname,
					lastName: responseData['plus-one'].lastname,
					dietaryRequirements: responseData['plus-one']['dietary-requirements'] ?? null,
					rsvp: true,
					canAddPlusOne: false
				});
			}

			const rsvp = await guests.rsvp(guestId, responseData.rsvp ?? null);

			guestResponses.push(rsvp);
		}

		return {
			guestResponses
		};
	}
} satisfies Actions;
