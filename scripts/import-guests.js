import { readFile, writeFileSync, unlink } from 'fs';
import * as csv from 'csv/sync';
import { execSync } from 'child_process';

/**
 * Script for seeding guests from a csv file into the database
 * @example node .\scripts\import-guests.js ./guests.csv remote
 */

const [file, remoteFlag] = process.argv.slice(2);
const outputFile = './guests.sql';

if (!file) {
	console.error('Expected csv file as argument');
	process.exit(1);
}

function mapRecords(records) {
	const formatGuestType = (str) => {
		if (str.toLowerCase() === 'both') return 'all_day';
		return 'evening';
	};
	const formatAddPlusOne = (str) => {
		if (str === 'true') return 1;
		return 0;
	};

	const formattedRecords = records.map((record) => ({
		id: crypto.randomUUID(),
		originalId: record['ID'],
		first_name: record['First Name'],
		last_name: record['Last Name'],
		phone_number: record['Phone number'],
		rsvp: record['rsvp'],
		message: record['message'],
		partner_id: record['Partner'],
		dietary_requirements: record['Allergies'],
		can_add_plus_one: formatAddPlusOne(record['Has plus one']),
		plus_one_of: record['Plus one of'],
		guest_type: formatGuestType(record['Both / just evening'])
	}));

	const idLookup = new Map(formattedRecords.map((r) => [r.originalId, r.id]));

	// Resolve both partner_id and plus_one_of from original CSV IDs to generated UUIDs.
	// Log anything that doesn't resolve so bad data fails loud instead of silently writing NULL.
	const linkedRecords = formattedRecords.map((r) => {
		let partner_id = null;
		if (r.partner_id) {
			partner_id = idLookup.get(r.partner_id) ?? null;
			if (partner_id === null) {
				console.warn(
					`Warning: guest ${r.originalId} (${r.first_name} ${r.last_name}) references unknown partner ID "${r.partner_id}"`
				);
			}
		}

		let plus_one_of = null;
		if (r.plus_one_of) {
			plus_one_of = idLookup.get(r.plus_one_of) ?? null;
			if (plus_one_of === null) {
				console.warn(
					`Warning: guest ${r.originalId} (${r.first_name} ${r.last_name}) references unknown "Plus one of" ID "${r.plus_one_of}"`
				);
			}
		}

		return { ...r, partner_id, plus_one_of };
	});

	return linkedRecords;
}

function writeToSql(records) {
	const escape = (value) => {
		if (value === null || value === undefined) return 'NULL';
		return `'${String(value).replace(/'/g, "''")}'`; // escape single quotes
	};

	const insertColumns = [
		'id',
		'first_name',
		'last_name',
		'phone_number',
		'rsvp',
		'message',
		'dietary_requirements',
		'can_add_plus_one',
		'guest_type'
	];

	const statements = [];

	statements.push('DELETE FROM guests;');

	// Insert every guest with self-referencing FKs left out entirely.
	// This guarantees every row exists before we try to link partner_id / plus_one_of.
	for (const r of records) {
		const values = insertColumns.map((col) => escape(r[col])).join(', ');
		statements.push(`INSERT INTO guests (${insertColumns.join(', ')}) VALUES (${values});`);
	}

	// Link the self-referencing FKs
	for (const r of records) {
		const sets = [];
		if (r.partner_id !== null && r.partner_id !== undefined) {
			sets.push(`partner_id = ${escape(r.partner_id)}`);
		}
		if (r.plus_one_of !== null && r.plus_one_of !== undefined) {
			sets.push(`plus_one_of = ${escape(r.plus_one_of)}`);
		}
		if (sets.length > 0) {
			statements.push(`UPDATE guests SET ${sets.join(', ')} WHERE id = ${escape(r.id)};`);
		}
	}

	const sqlContent = statements.join('\n') + '\n';
	writeFileSync(outputFile, sqlContent, 'utf8');
	console.log(`Wrote ${records.length} records to ${outputFile}`);
}

function runSqlWithWrangler(dbName, sqlFilePath, { remote = false } = {}) {
	const flag = remote ? '--remote' : '--local';
	const command = `npx wrangler d1 execute ${dbName} --file=${sqlFilePath} ${flag}`;
	console.log(`Running: ${command}`);

	try {
		const output = execSync(command, {
			encoding: 'utf8',
			stdio: 'pipe',
			env: { ...process.env, WRANGLER_LOG: 'debug' }
		});
		console.log(output);
	} catch (err) {
		console.error('Wrangler command failed:');
		console.error('--- stdout ---');
		console.error(err.stdout || '(empty)');
		console.error('--- stderr ---');
		console.error(err.stderr || '(empty)');
		process.exit(1);
	}
}

readFile(file, (err, fileData) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	console.log('Reading csv file...');
	const records = csv.parse(fileData, { columns: true, trim: true });

	console.log('Mapping columns...');
	const formattedRecords = mapRecords(records);

	console.log('Writing sql file...');
	writeToSql(formattedRecords);

	runSqlWithWrangler('wedding', outputFile, {
		remote: remoteFlag === 'remote'
	});

	console.log(`Removing ${outputFile} from file system...`);
	unlink(outputFile, (err) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
	});
});
