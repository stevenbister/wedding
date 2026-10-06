import { expect, test } from '@playwright/test';

test.describe('search guest', { tag: '@smoke' }, () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('home page has expected h1', async ({ page }) => {
		await expect(page.getByRole('heading', { level: 1 })).toHaveText('Steve & Grace Get Married!');
	});

	test('searches for a guest', async ({ page }) => {
		const rsvpButton = page.getByRole('link', { name: 'RSVP' });

		await expect(rsvpButton).toBeVisible();
		await rsvpButton.click();
		await page.waitForURL('**/rsvp');

		const input = page.getByLabel('Phone number');

		await expect(input).toBeVisible();

		await input.fill('07123456789');
		await page.getByRole('button', { name: 'Search' }).click();

		// Seeded user id - see seed.sql for more values
		await expect(page).toHaveURL(/.*\/rsvp\/00000000-0000-0000-0000-000000000001/);
	});
});

test.describe('rsvp', { tag: '@smoke' }, () => {
	test.beforeEach(async ({ page }) => {
		// Seeded user id - see seed.sql for more values
		await page.goto('/rsvp/00000000-0000-0000-0000-000000000001');
	});

	test('rsvp page has expected heading', async ({ page }) => {
		await expect(page.getByRole('heading', { level: 1 })).toHaveText('RSVP');
		await expect(page.getByRole('heading', { level: 2 })).toHaveText('by 1st March, 2027');
	});

	test('lists the guest and their partner', async ({ page }) => {
		await expect(page.getByText('John')).toBeVisible();
		await expect(page.getByText('Jane')).toBeVisible();
	});

	test('guests can accept their rsvp with dietary details', async ({ page }) => {
		const johnGroup = page.getByRole('group', { name: 'John' });
		const janeGroup = page.getByRole('group', { name: 'Jane' });

		const johnButton = johnGroup.getByRole('button', { name: 'Accept' });
		const janeButton = janeGroup.getByRole('button', { name: 'Accept' });

		await johnButton.click();
		await expect(johnButton).toContainClass('pressed');

		const johnDiet = johnGroup.getByRole('checkbox', { name: 'I have dietary requirements' });
		await johnDiet.check();

		const johnDietaryInput = johnGroup.getByRole('textbox', { name: 'Please add your dietary' });
		await johnDietaryInput.fill('Vegetarian');

		await janeButton.click();
		await expect(janeButton).toContainClass('pressed');

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(page.getByText('Thank you!')).toBeVisible();
	});
});

test.describe('plus one', { tag: '@smoke' }, () => {
	test.beforeEach(async ({ page }) => {
		// Seeded user id - see seed.sql for more values
		await page.goto('/rsvp/00000000-0000-0000-0000-000000000003');
	});

	test('user can add a plus one to the guest list', async ({ page }) => {
		const guest = page.getByRole('group', { name: 'Joe' });
		const accept = guest.getByRole('button', { name: 'Accept' });

		await accept.click();

		const plusOneGroup = page.getByRole('group', { name: 'Plus one' });

		const firstName = plusOneGroup.getByRole('textbox', { name: 'First name' });
		const lastName = plusOneGroup.getByRole('textbox', { name: 'Last name' });

		await firstName.fill('Jane');
		await lastName.fill('Blogs');

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(page.getByText('Thank you!')).toBeVisible();

		await page.goto('/rsvp/00000000-0000-0000-0000-000000000003');

		await expect(firstName).toHaveValue('Jane');
		await expect(lastName).toHaveValue('Blogs');
	});
});
