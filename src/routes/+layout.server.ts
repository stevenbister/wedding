import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ platform }) => {
	return {
		inviteReady: platform?.env.INVITE_READY === 'true'
	};
};
