import { foreignKey, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const guests = sqliteTable(
	'guests',
	{
		id: text()
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		firstName: text('first_name').notNull(),
		lastName: text('last_name').notNull(),
		phoneNumber: text('phone_number').notNull(),
		rsvp: integer({ mode: 'boolean' }),
		message: text(),
		partnerId: text('partner_id')
	},
	(table) => [
		foreignKey({
			columns: [table.partnerId],
			foreignColumns: [table.id],
			name: 'custom_fk'
		})
	]
);
