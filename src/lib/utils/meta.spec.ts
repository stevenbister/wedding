import { expect, it } from 'vitest';
import { buildMetaTitle } from './meta';

it('returns the string with the brand name appended to the end', () => {
	expect(buildMetaTitle('Save the date')).toBe('Save the date | Steve & Grace get married');
});
