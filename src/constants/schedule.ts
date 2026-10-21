import Ceremony from '$/lib/illustrations/ceremony.svelte';
import Cheers from '$/lib/illustrations/cheers.svelte';
import Dance from '$/lib/illustrations/dance.svelte';
import SeatingChart from '$/lib/illustrations/seating-chart.svelte';
import Tea from '$/lib/illustrations/tea.svelte';
import Groomsmen from '$/lib/illustrations/groomsmen.svelte';
import Shoe from '$/lib/illustrations/shoe.svelte';

export const schedule = [
	{
		event: 'Arrival',
		time: '12pm - 12.30pm',
		content: 'The bar opens at 12 so feel free to grab yourself a drink while you wait!',
		illustration: Groomsmen
	},
	{
		event: 'Ceremony',
		time: '1pm',
		content: 'Witness our "I do\'s"',
		illustration: Ceremony
	},
	{
		event: 'Drinks Reception',
		time: '1.30pm',
		content: 'Drinks, canapes, mingling and photos.',
		illustration: Cheers
	},
	{
		event: 'Wedding Breakfast',
		time: '3pm',
		content: 'Listen and laugh to the speeches and enjoy the meal.',
		illustration: SeatingChart
	},
	{
		event: 'Tea and Coffee',
		time: '5.30pm',
		content:
			'Enjoy a tea or coffee (or something harder) while the DJ sets up and evening guests arrive.',
		illustration: Tea
	},
	{
		event: 'Dancing!',
		time: '7.30pm',
		content: 'Watch us squirm on the dance floor, then join in and dance the night away!',
		illustration: Dance
	},
	{
		event: 'End of the night',
		time: '12pm',
		content: 'Music ends and bar closes around now, taxis will arrive shortly.',
		illustration: Shoe
	}
];
