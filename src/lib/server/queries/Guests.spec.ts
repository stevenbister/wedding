import { expect, it, vi, beforeEach, describe, afterEach } from 'vitest';
import { Guests } from './Guests';
import { Database } from '../db';
import { eq } from 'drizzle-orm';
import { guests as guestsTable, type TGuests } from '../db/schema';
import { env } from 'cloudflare:workers';

const mockGuest: TGuests = {
	id: 'guest-1',
	firstName: 'John',
	lastName: 'Doe',
	phoneNumber: '07123456789',
	rsvp: true,
	message: 'Looking forward to it!',
	partnerId: 'guest-2',
	dietaryRequirements: 'Vegetarian',
	canAddPlusOne: false,
	plusOneOf: null,
	guestType: 'all_day'
};

const mockPartner: TGuests = {
	id: 'guest-2',
	firstName: 'Jane',
	lastName: 'Doe',
	phoneNumber: '07123456788',
	rsvp: true,
	message: null,
	partnerId: 'guest-1',
	dietaryRequirements: null,
	canAddPlusOne: false,
	plusOneOf: null,
	guestType: 'all_day'
};

const mockGuestPlusOne: TGuests = {
	id: 'guest-3',
	firstName: 'John',
	lastName: 'Doe',
	phoneNumber: '07123456789',
	rsvp: true,
	message: null,
	partnerId: null,
	dietaryRequirements: null,
	canAddPlusOne: true,
	plusOneOf: null,
	guestType: 'evening'
};

Database.initialize(env.DB);
const db = Database.getInstance();

describe('Guests', () => {
	let guests: Guests;

	beforeEach(async () => {
		vi.clearAllMocks();

		await db.insert(guestsTable).values({ ...mockPartner, partnerId: null });
		await db.insert(guestsTable).values(mockGuest);
		await db.insert(guestsTable).values(mockGuestPlusOne);
		await db.update(guestsTable).set({ partnerId: 'guest-1' }).where(eq(guestsTable.id, 'guest-2'));

		guests = new Guests();
	});

	afterEach(async () => {
		await db.delete(guestsTable);
	});

	describe('getByPhoneNumber', () => {
		it('returns a guest when phone number exists', async () => {
			const result = await guests.getByPhoneNumber(mockGuest.phoneNumber!);

			expect(result).toEqual(mockGuest);
		});

		it('returns undefined when phone number does not exist', async () => {
			const result = await guests.getByPhoneNumber('0000000000');

			expect(result).toBeUndefined();
		});
	});

	describe('getPartner', () => {
		it('returns partner when guest has a partner', async () => {
			const result = await guests.getPartner('guest-1');

			expect(result).toEqual(mockPartner);
		});

		it('returns null when guest has no partner', async () => {
			await db.update(guestsTable).set({ partnerId: null }).where(eq(guestsTable.id, 'guest-1'));

			const result = await guests.getPartner('guest-1');

			expect(result).toBeNull();
		});
	});

	describe('rsvp', () => {
		it('updates guest RSVP status and return result', async () => {
			const result = await guests.rsvp('guest-1', true);

			expect(result).toEqual({ ...mockGuest, rsvp: true });
		});

		it('updates guest RSVP status to false', async () => {
			const result = await guests.rsvp('guest-1', false);

			expect(result).toEqual({ ...mockGuest, rsvp: false });
		});
	});

	describe('addMessage', () => {
		it('updates guest message and return result', async () => {
			const message = 'Looking forward to the wedding!';

			const result = await guests.addMessage('guest-1', message);

			expect(result).toEqual([{ ...mockGuest, message }]);
		});

		it('handles empty message', async () => {
			const result = await guests.addMessage('guest-1', '');

			expect(result).toEqual([{ ...mockGuest, message: '' }]);
		});
	});

	describe('addDietaryRequirements', () => {
		it('updates guest dietary requirements and return result', async () => {
			const dietaryRequirements = 'Vegetarian, gluten-free';

			const result = await guests.addDietaryRequirements('guest-1', dietaryRequirements);

			expect(result).toEqual([{ ...mockGuest, dietaryRequirements }]);
		});

		it('handles empty dietary requirements', async () => {
			const result = await guests.addDietaryRequirements('guest-1', '');

			expect(result).toEqual([{ ...mockGuest, dietaryRequirements: '' }]);
		});
	});

	describe('upsertPlusOne', () => {
		const plusOneData = { firstName: 'Jane', lastName: 'Blogs' };

		it('creates a plus one', async () => {
			const result = await guests.upsertPlusOne('guest-3', plusOneData);

			expect(result).toEqual([
				{
					id: expect.any(String),
					firstName: 'Jane',
					lastName: 'Blogs',
					phoneNumber: null,
					rsvp: null,
					message: null,
					partnerId: null,
					dietaryRequirements: null,
					canAddPlusOne: false,
					plusOneOf: 'guest-3',
					guestType: null
				}
			]);
		});

		it('throws when guest is not allowed to add a plus one', async () => {
			await expect(guests.upsertPlusOne('guest-1', plusOneData)).rejects.toThrow(
				'Not allowed to add a plus one'
			);
		});
	});
});
