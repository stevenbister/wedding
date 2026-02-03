import { expect, it } from 'vitest';
import { getDateRangeAround } from './dates';

it('should return an array of objects with day name and date number', () => {
	const result = getDateRangeAround(new Date(2026, 0, 26));

	expect(result).toHaveLength(7);

	expect(result[0]).toMatchObject({
		day: 'Mon',
		date: 23,
		target: false
	});

	expect(result[1]).toMatchObject({
		day: 'Tue',
		date: 24,
		target: false
	});

	expect(result[2]).toMatchObject({
		day: 'Wed',
		date: 25,
		target: false
	});

	expect(result[3]).toMatchObject({
		day: 'Thu',
		date: 26,
		target: true
	});

	expect(result[4]).toMatchObject({
		day: 'Fri',
		date: 27,
		target: false
	});
});
