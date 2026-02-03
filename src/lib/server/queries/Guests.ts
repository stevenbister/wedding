import { eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';
import { guests } from '../db/schema';
import { Database } from '../db';

export class Guests {
	readonly db = Database.getInstance();

	async getByPhoneNumber(phoneNumber: string) {
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

	async rsvp(guestId: string, rsvp: boolean) {
		const result = await this.db
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
}
