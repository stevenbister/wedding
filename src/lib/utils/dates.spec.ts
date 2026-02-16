import { expect, it } from 'vitest';
import { getDateRangeAround } from './dates';
import dayjs from 'dayjs';

it('should return an array of objects with day name and date number', () => {
	const result = getDateRangeAround(dayjs('2026-01-26'));

	expect(result).toHaveLength(7);

	expect(result[0]).toMatchObject({
		day: 'Fri',
		date: '23',
		target: false
	});

	expect(result[1]).toMatchObject({
		day: 'Sat',
		date: '24',
		target: false
	});

	expect(result[2]).toMatchObject({
		day: 'Sun',
		date: '25',
		target: false
	});

	expect(result[3]).toMatchObject({
		day: 'Mon',
		date: '26',
		target: true
	});

	expect(result[4]).toMatchObject({
		day: 'Tue',
		date: '27',
		target: false
	});
});
