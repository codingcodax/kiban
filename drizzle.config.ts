import type { Config } from 'drizzle-kit';

import { env } from '~/env';

const nonPoolingUrl = env.POSTGRES_URL.replace(':6543', ':5432');

export default {
	schema: './src/server/db/schema',
	dialect: 'postgresql',
	dbCredentials: { url: nonPoolingUrl },
	tablesFilter: ['kiku_*'],
} satisfies Config;
