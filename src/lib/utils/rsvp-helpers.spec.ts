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
	it('parses the form data and returns it in the correct format', () => {
		const formData = new FormData();
		formData.append('guests[00000000-0000-0000-0000-000000000003][rsvp]', 'accept');
		formData.append('guests[00000000-0000-0000-0000-000000000003][has-dietary-requirements]', 'on');
		formData.append('guests[00000000-0000-0000-0000-000000000003][dietary-requirements]', 'vegan');
		formData.append('message', '');

		const result = parseRsvpFormData(formData);

		expect(result).toEqual({
			guests: {
				'00000000-0000-0000-0000-000000000003': {
					rsvp: true,
					'has-dietary-requirements': 'on',
					'dietary-requirements': 'vegan'
				}
			},
			message: ''
		});
	});
});
