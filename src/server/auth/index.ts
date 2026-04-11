import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';

import { env } from '~/env';
import { getBaseUrl } from '~/lib/get-base-url';
import { db } from '~/server/db';

export const auth = betterAuth({
	appName: 'Kiroku',
	baseURL: getBaseUrl(),

	database: drizzleAdapter(db, {
		provider: 'pg',
	}),

	emailAndPassword: {
		enabled: true,
		minPasswordLength: 8,
	},

	socialProviders: {
		google: {
			accessType: 'offline',
			prompt: 'select_account consent',
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
	plugins: [nextCookies()],
});
