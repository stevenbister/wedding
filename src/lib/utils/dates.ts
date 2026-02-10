import dayjs from 'dayjs';

export function getDateRangeAround(targetDate: dayjs.Dayjs) {
	const result: { day: string; date: string; target: boolean }[] = [];

	const startDate = targetDate.subtract(3, 'day');

	for (let i = 0; i < 7; i++) {
		const currentDate = startDate.add(i, 'day');

		result.push({
			day: currentDate.format('ddd'),
			date: currentDate.format('D'),
			target: currentDate.isSame(targetDate, 'day')
		});
	}

	return result;
}

export function getMonthAndYear(date: dayjs.Dayjs) {
	return date.format('MMMM YYYY');
}
