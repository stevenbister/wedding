import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ platform }) => {
	if (platform?.env.INVITE_READY !== 'true') {
		redirect(307, '/save-the-date');
	}
};
