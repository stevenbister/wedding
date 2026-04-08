import Ceremony from '$/lib/illustrations/ceremony.svelte';
import Cheers from '$/lib/illustrations/cheers.svelte';
import Dance from '$/lib/illustrations/dance.svelte';
import SeatingChart from '$/lib/illustrations/seating-chart.svelte';

export const schedule = [
	{
		event: 'Ceremony',
		time: '12:30pm',
		content: 'Mollit voluptate officia amet cupidatat adipisicing aute cupidatat et culpa enim.',
		illustration: Ceremony
	},
	{
		event: 'Drinks',
		time: '1:00pm',
		content: 'Mollit voluptate officia amet cupidatat adipisicing aute cupidatat et culpa enim.',
		illustration: Cheers
	},
	{
		event: 'Breakfast',
		time: '2:00pm',
		content: 'Mollit voluptate officia amet cupidatat adipisicing aute cupidatat et culpa enim.',
		illustration: SeatingChart
	},
	{
		event: 'Party',
		time: '3:00pm',
		content: 'Mollit voluptate officia amet cupidatat adipisicing aute cupidatat et culpa enim.',
		illustration: Dance
	}
];
