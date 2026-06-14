import { createFsDrain } from 'evlog/fs';
import { createEvlog } from 'evlog/next';

export const { withEvlog, useLogger, log, createError } = createEvlog({
	service: 'kiban',
	drain: createFsDrain(),
});
