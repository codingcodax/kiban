import type { TRPCRouterRecord } from '@trpc/server';

import { getSession } from './get-session';

export const authRouter = {
	getSession,
} satisfies TRPCRouterRecord;
