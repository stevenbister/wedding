import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { Guests } from '$lib/server/queries/Guests';
import { parseRsvpFormData } from '$/lib/utils/rsvp-helpers';

export const load: PageServerLoad = async ({ params, platform }) => {
	if (platform?.env.INVITE_READY !== 'true') {
		redirect(307, '/save-the-date');
	}

	const guestId = params.guestId;

	if (!guestId) {
		return error(404);
	}

	const guests = new Guests();
	const guest = await guests.getById(guestId);
	const partner = guest.partnerId ? await guests.getPartner(guestId) : null;
	const plusOne = guest.canAddPlusOne ? await guests.getPlusOne(guestId) : null;

	return {
		guest,
		partner,
		plusOne
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
		const [guestId] = Object.keys(parsedData.guests);

		const guests = new Guests();

		if (parsedData.message !== undefined) {
			await guests.addMessage(guestId, parsedData.message);
		}

		if (parsedData['song-request'] !== undefined) {
			await guests.addSongRequest(guestId, parsedData['song-request']);
		}

		const guestResponses = [];

		for (const [guestId, responseData] of Object.entries(parsedData.guests)) {
			if (responseData['dietary-requirements']) {
				await guests.addDietaryRequirements(guestId, responseData['dietary-requirements']);
			}

			if (
				responseData['plus-one'] &&
				(responseData['plus-one'].firstname || responseData['plus-one'].lastname)
			) {
				if (!responseData['plus-one'].firstname || !responseData['plus-one'].lastname) {
					return fail(400, {
						error: true,
						message: 'Plus one first name and last name are required'
					});
				}

				await guests.upsertPlusOne(guestId, {
					id: responseData['plus-one'].id,
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
