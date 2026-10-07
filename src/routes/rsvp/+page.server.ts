import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { Guests } from '$lib/server/queries/Guests';

export const load: PageServerLoad = async ({ platform }) => {
	if (platform?.env.INVITE_READY !== 'true') {
		redirect(307, '/save-the-date');
	}
};

export const actions = {
	search: async ({ request }) => {
		const data = await request.formData();
		const phoneNumber = data.get('phone')?.toString().trim() ?? null;

		if (!phoneNumber) {
			return fail(400, { phoneNumber, error: true, message: 'Please enter your phone number.' });
		}

		const numberRegex = /^\d{11}$/;
		if (!numberRegex.test(phoneNumber)) {
			return fail(400, {
				phoneNumber,
				error: true,
				message: 'Please enter a valid phone number.'
			});
		}

		const guests = new Guests();
		const guest = await guests.getByPhoneNumber(phoneNumber);

		if (!guest) {
			return fail(400, {
				phoneNumber,
				error: true,
				message:
					'Oh no! We can’t find that phone number. Please try again or contact Steve or Grace.'
			});
		}

		return redirect(303, `/rsvp/${guest.id}`);
	}
} satisfies Actions;
