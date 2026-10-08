import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';

const __dirname = import.meta.dirname;
dotenv.config({
	path: path.resolve(__dirname, '.env')
});

export default defineConfig({
	workers: process.env.CI ? 1 : undefined,
	webServer: {
		command: 'npm run build && npm run db:seed && npm run preview',
		port: 4173
	},
	testDir: 'e2e'
});
