import { describe, expect, it } from 'vitest';
import { getRSVPResponseFromForm, parseRsvpFormData } from './rsvp-helpers';

describe('getRSVPResponseFromForm', () => {
	it.each([
		{
			label: 'all_true',
			responses: [
				{ rsvp: true },
				{
					rsvp: true
				}
			]
		},
		{
			label: 'some_true',
			responses: [
				{ rsvp: true },
				{
					rsvp: false
				}
			]
		},
		{
			label: 'all_false',
			responses: [
				{ rsvp: false },
				{
					rsvp: false
				}
			]
		}
	])('returns $label response from form data', ({ label, responses }) => {
		expect(getRSVPResponseFromForm(responses)).toBe(label);
	});
});

describe('parseRsvpFormData', () => {
	const guestId = '00000000-0000-0000-0000-000000000003';

	it('parses the form data and returns it in the correct format', () => {
		const formData = new FormData();
		formData.append(`guests[${guestId}][rsvp]`, 'accept');
		formData.append(`guests[${guestId}][has-dietary-requirements]`, 'on');
		formData.append(`guests[${guestId}][dietary-requirements]`, 'vegan');
		formData.append('message', '');

		const result = parseRsvpFormData(formData);

		expect(result).toEqual({
			guests: {
				[guestId]: {
					rsvp: true,
					'has-dietary-requirements': 'on',
					'dietary-requirements': 'vegan'
				}
			},
			message: ''
		});
	});

	it('parses the form data and returns it with plus one info in the correct format', () => {
		const formData = new FormData();
		formData.append(`guests[${guestId}][rsvp]`, 'accept');
		formData.append(`guests[${guestId}][has-dietary-requirements]`, 'on');
		formData.append(`guests[${guestId}][dietary-requirements]`, 'vegan');
		formData.append(`guests[${guestId}][plus-one][firstname]`, 'Jane');
		formData.append(`guests[${guestId}][plus-one][lastname]`, 'Blogs');
		formData.append(`guests[${guestId}][plus-one][has-dietary-requirements]`, 'on');
		formData.append(`guests[${guestId}][plus-one][dietary-requirements]`, 'vegan');
		formData.append('message', '');

		const result = parseRsvpFormData(formData);

		expect(result).toEqual({
			guests: {
				[guestId]: {
					rsvp: true,
					'has-dietary-requirements': 'on',
					'dietary-requirements': 'vegan',
					'plus-one': {
						firstname: 'Jane',
						lastname: 'Blogs',
						'has-dietary-requirements': 'on',
						'dietary-requirements': 'vegan'
					}
				}
			},
			message: ''
		});
	});
});
