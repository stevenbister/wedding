import { expect, it, vi, beforeEach, describe } from 'vitest';
import { Guests } from './Guests';
import { Database } from '../db';
import { alias } from 'drizzle-orm/sqlite-core';
import { eq } from 'drizzle-orm';
import type { TGuests } from '../db/schema';

vi.mock('../db', () => ({
	Database: {
		getInstance: vi.fn()
	}
}));

vi.mock('../db/schema', () => ({
	guests: {
		id: 'id',
		firstName: 'first_name',
		lastName: 'last_name',
		phoneNumber: 'phone_number',
		rsvp: 'rsvp',
		message: 'message',
		partnerId: 'partner_id',
		dietaryRequirements: 'dietary_requirements'
	}
}));

vi.mock('drizzle-orm', () => ({
	eq: vi.fn()
}));

vi.mock('drizzle-orm/sqlite-core', () => ({
	alias: vi.fn()
}));

const mockGuest: TGuests = {
	id: 'guest-1',
	firstName: 'John',
	lastName: 'Doe',
	phoneNumber: '07123456789',
	rsvp: true,
	message: 'Looking forward to it!',
	partnerId: 'guest-2',
	dietaryRequirements: 'Vegetarian'
};

const mockPartner: TGuests = {
	id: 'guest-2',
	firstName: 'Jane',
	lastName: 'Doe',
	phoneNumber: '07123456789',
	rsvp: true,
	message: null,
	partnerId: 'guest-1',
	dietaryRequirements: null
};

describe('Guests', () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let mockDb: any;
	let guests: Guests;

	beforeEach(() => {
		vi.clearAllMocks();

		mockDb = {
			select: vi.fn().mockReturnThis(),
			from: vi.fn().mockReturnThis(),
			where: vi.fn().mockReturnThis(),
			leftJoin: vi.fn().mockReturnThis(),
			limit: vi.fn().mockResolvedValue([]),
			update: vi.fn().mockReturnThis(),
			set: vi.fn().mockReturnThis(),
			returning: vi.fn()
		};

		vi.mocked(Database.getInstance).mockReturnValue(mockDb);

		guests = new Guests();
	});

	describe('getByPhoneNumber', () => {
		it('returns a guest when phone number exists', async () => {
			mockDb.limit.mockResolvedValue([mockGuest]);

			const result = await guests.getByPhoneNumber('07123456789');

			expect(result).toBe(mockGuest);
			expect(mockDb.select).toHaveBeenCalled();
			expect(mockDb.from).toHaveBeenCalledWith({
				id: 'id',
				firstName: 'first_name',
				lastName: 'last_name',
				phoneNumber: 'phone_number',
				rsvp: 'rsvp',
				message: 'message',
				partnerId: 'partner_id',
				dietaryRequirements: 'dietary_requirements'
			});
		});

		it('returns undefined when phone number does not exist', async () => {
			mockDb.limit.mockResolvedValue([]);

			const result = await guests.getByPhoneNumber('0000000000');

			expect(result).toBeUndefined();
		});

		it('calls eq with correct phone number', async () => {
			mockDb.limit.mockResolvedValue([]);

			await guests.getByPhoneNumber('07123456789');

			expect(eq).toHaveBeenCalledWith('phone_number', '07123456789');
		});
	});

	describe('getPartner', () => {
		it('returns partner when guest has a partner', async () => {
			vi.mocked(alias).mockReturnValue(mockPartner);

			mockDb.limit.mockResolvedValue([{ partner: mockPartner }]);

			const result = await guests.getPartner('guest-1');

			expect(result).toBe(mockPartner);
			expect(alias).toHaveBeenCalledWith(
				{
					id: 'id',
					firstName: 'first_name',
					lastName: 'last_name',
					phoneNumber: 'phone_number',
					rsvp: 'rsvp',
					message: 'message',
					partnerId: 'partner_id',
					dietaryRequirements: 'dietary_requirements'
				},
				'partner'
			);
		});

		it('returns null when guest has no partner', async () => {
			vi.mocked(alias).mockReturnValue(mockPartner);

			mockDb.limit.mockResolvedValue([]);

			const result = await guests.getPartner('guest-1');

			expect(result).toBeNull();
		});

		it('returns null when row exists but partner is null', async () => {
			vi.mocked(alias).mockReturnValue(mockPartner);

			mockDb.limit.mockResolvedValue([{ partner: null }]);

			const result = await guests.getPartner('guest-1');

			expect(result).toBeNull();
		});

		it('calls eq with correct guest ID', async () => {
			vi.mocked(alias).mockReturnValue(mockPartner);

			mockDb.limit.mockResolvedValue([]);

			await guests.getPartner('guest-1');

			expect(eq).toHaveBeenCalledWith('id', 'guest-1');
		});
	});

	describe('rsvp', () => {
		it('updates guest RSVP status and return result', async () => {
			const mockResult = [mockGuest];

			mockDb.returning.mockResolvedValue(mockResult);

			const result = await guests.rsvp('guest-1', true);

			expect(result).toBe(mockResult);
			expect(mockDb.update).toHaveBeenCalledWith({
				id: 'id',
				firstName: 'first_name',
				lastName: 'last_name',
				phoneNumber: 'phone_number',
				rsvp: 'rsvp',
				message: 'message',
				partnerId: 'partner_id',
				dietaryRequirements: 'dietary_requirements'
			});
			expect(mockDb.set).toHaveBeenCalledWith({ rsvp: true });
			expect(eq).toHaveBeenCalledWith('id', 'guest-1');
		});

		it('updates guest RSVP status to false', async () => {
			const mockResult = [
				{
					...mockGuest,
					rsvp: false
				}
			];

			mockDb.returning.mockResolvedValue(mockResult);

			const result = await guests.rsvp('guest-1', false);

			expect(result).toBe(mockResult);
			expect(mockDb.set).toHaveBeenCalledWith({ rsvp: false });
		});
	});

	describe('addMessage', () => {
		it('updates guest message and return result', async () => {
			const mockResult = [
				{
					...mockGuest,
					message: 'Looking forward to the wedding!'
				}
			];

			mockDb.returning.mockResolvedValue(mockResult);

			const result = await guests.addMessage('guest-1', mockResult[0].message);

			expect(result).toBe(mockResult);
			expect(mockDb.update).toHaveBeenCalledWith({
				id: 'id',
				firstName: 'first_name',
				lastName: 'last_name',
				phoneNumber: 'phone_number',
				rsvp: 'rsvp',
				message: 'message',
				partnerId: 'partner_id',
				dietaryRequirements: 'dietary_requirements'
			});
			expect(mockDb.set).toHaveBeenCalledWith({ message: mockResult[0].message });
			expect(eq).toHaveBeenCalledWith('id', 'guest-1');
		});

		it('handles empty message', async () => {
			const mockResult = [
				{
					...mockGuest,
					message: ''
				}
			];

			mockDb.returning.mockResolvedValue(mockResult);

			const result = await guests.addMessage('guest-1', '');

			expect(result).toBe(mockResult);
			expect(mockDb.set).toHaveBeenCalledWith({ message: '' });
		});
	});

	describe('addDietaryRequirements', () => {
		it('updates guest dietary requirements and return result', async () => {
			const mockResult = [
				{
					...mockGuest,
					dietaryRequirements: 'Vegetarian, gluten-free'
				}
			];

			mockDb.returning.mockResolvedValue(mockResult);

			const result = await guests.addDietaryRequirements(
				'guest-1',
				mockResult[0].dietaryRequirements
			);

			expect(result).toBe(mockResult);
			expect(mockDb.update).toHaveBeenCalledWith({
				id: 'id',
				firstName: 'first_name',
				lastName: 'last_name',
				phoneNumber: 'phone_number',
				rsvp: 'rsvp',
				message: 'message',
				partnerId: 'partner_id',
				dietaryRequirements: 'dietary_requirements'
			});
			expect(mockDb.set).toHaveBeenCalledWith({
				dietaryRequirements: mockResult[0].dietaryRequirements
			});
			expect(eq).toHaveBeenCalledWith('id', 'guest-1');
		});

		it('handles empty dietary requirements', async () => {
			const mockResult = [
				{
					...mockGuest,
					dietaryRequirements: ''
				}
			];

			mockDb.returning.mockResolvedValue(mockResult);

			const result = await guests.addDietaryRequirements('guest-1', '');

			expect(result).toBe(mockResult);
			expect(mockDb.set).toHaveBeenCalledWith({ dietaryRequirements: '' });
		});
	});
});
