export function getDateRangeAround(targetDate: Date) {
	const result: { day: string; date: number; target: boolean }[] = [];

	const dayFormatter = new Intl.DateTimeFormat('en-GB', { weekday: 'short' });

	// Start from 3 days before the target date
	const startDate = new Date();
	startDate.setDate(targetDate.getDate() - 3);

	// Generate 7 days total (3 before + target + 3 after)
	for (let i = 0; i < 7; i++) {
		const currentDate = new Date(startDate);
		currentDate.setDate(startDate.getDate() + i);

		result.push({
			day: dayFormatter.format(currentDate),
			date: currentDate.getDate(),
			target: targetDate.getDate() === currentDate.getDate()
		});
	}

	return result;
}

export function getMonth(date: Date) {
	const dateFormatter = new Intl.DateTimeFormat('en-GB', { month: 'long' });

	return dateFormatter.format(date);
}
