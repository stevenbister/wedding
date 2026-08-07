import { sql } from 'drizzle-orm';
import { foreignKey, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const guests = sqliteTable(
	'guests',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		firstName: text('first_name').notNull(),
		lastName: text('last_name').notNull(),
		phoneNumber: text('phone_number'),
		rsvp: integer({ mode: 'boolean' }),
		message: text(),
		partnerId: text('partner_id'),
		dietaryRequirements: text('dietary_requirements'),
		canAddPlusOne: integer('can_add_plus_one', { mode: 'boolean' }).notNull().default(false),
		plusOneOf: text('plus_one_of'),
		guestType: text('guest_type').$type<'all_day' | 'evening'>()
	},
	(table) => [
		foreignKey({
			columns: [table.partnerId],
			foreignColumns: [table.id],
			name: 'partner_fk'
		}),
		foreignKey({
			columns: [table.plusOneOf],
			foreignColumns: [table.id],
			name: 'plus_one_fk'
		})
	]
);

export type TGuests = typeof guests.$inferSelect;
export type GuestsInsert = typeof guests.$inferInsert;

export const events = sqliteTable('events', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	type: text('type', {
		enum: ['click']
	}).notNull(),
	name: text('name').notNull(),
	page: text('page'),
	userAgent: text('user_agent'),
	referrer: text('referrer'),
	meta: text('meta', { mode: 'json' }),
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull()
});

export type TEvents = typeof events.$inferSelect;
export type EventsInsert = typeof events.$inferInsert;
