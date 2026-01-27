import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/save-the-date', () => {
	it('renders the save the date heading', async () => {
		render(Page);

		await expect
			.element(page.getByRole('heading', { level: 1, name: 'Save the date' }))
			.toBeInTheDocument();
	});

	it('renders the dates to save', async () => {
		render(Page);

		await expect.element(page.getByText('January')).toBeInTheDocument();

		await expect.element(page.getByText('Fri', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('23')).toBeInTheDocument();

		await expect.element(page.getByText('Sat', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('24')).toBeInTheDocument();

		await expect.element(page.getByText('Sun', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('25')).toBeInTheDocument();

		await expect.element(page.getByText('Mon', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('26')).toBeInTheDocument();

		await expect.element(page.getByText('Tue', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('27')).toBeInTheDocument();

		await expect.element(page.getByText('Wed', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('28')).toBeInTheDocument();

		await expect.element(page.getByText('Thu', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('29')).toBeInTheDocument();
	});

	it('renders the cta section', async () => {
		render(Page);

		await expect
			.element(page.getByRole('heading', { level: 2, name: 'Steve & Grace' }))
			.toBeInTheDocument();
		await expect
			.element(page.getByText('Invite you to celebrate their wedding'))
			.toBeInTheDocument();
		await expect.element(page.getByRole('button', { name: 'Save the date' })).toBeInTheDocument();
	});
});
