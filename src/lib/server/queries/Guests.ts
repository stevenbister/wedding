import { eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';
import { guests, type GuestsInsert, type TGuests } from '../db/schema';
import { Database } from '../db';

export class Guests {
	readonly db = Database.getInstance();

	async getById(guestId: string) {
		const [result] = await this.db.select().from(guests).where(eq(guests.id, guestId)).limit(1);

		return result;
	}

	async getByPhoneNumber(phoneNumber: string): Promise<TGuests | null> {
		const [result] = await this.db
			.select()
			.from(guests)
			.where(eq(guests.phoneNumber, phoneNumber))
			.limit(1);

		return result;
	}

	async getPartner(guestId: string) {
		const partner = alias(guests, 'partner');

		const [row] = await this.db
			.select({
				partner
			})
			.from(guests)
			.leftJoin(partner, eq(guests.partnerId, partner.id))
			.where(eq(guests.id, guestId))
			.limit(1);

		return row?.partner ?? null;
	}

	async rsvp(guestId: string, rsvp: boolean | null) {
		const [result] = await this.db
			.update(guests)
			.set({ rsvp })
			.where(eq(guests.id, guestId))
			.returning();

		return result;
	}

	async addMessage(guestId: string, message: string) {
		const result = await this.db
			.update(guests)
			.set({ message })
			.where(eq(guests.id, guestId))
			.returning();

		return result;
	}

	async addDietaryRequirements(guestId: string, dietaryRequirements: string) {
		const result = await this.db
			.update(guests)
			.set({ dietaryRequirements })
			.where(eq(guests.id, guestId))
			.returning();

		return result;
	}

	async getPlusOne(guestId: string) {
		const [result] = await this.db.select().from(guests).where(eq(guests.plusOneOf, guestId));

		return result;
	}

	async upsertPlusOne(guestId: string, plusOneData: GuestsInsert) {
		const creator = await this.getById(guestId);

		if (!creator.canAddPlusOne) throw new Error('Not allowed to add a plus one');

		const result = await this.db
			.insert(guests)
			.values({
				...plusOneData,
				plusOneOf: guestId
			})
			.onConflictDoUpdate({
				target: guests.id,
				set: {
					...plusOneData,
					plusOneOf: guestId
				}
			})
			.returning();

		return result;
	}
}
