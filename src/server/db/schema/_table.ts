import { pgEnum, pgTableCreator } from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator((name) => `kiban_${name}`);

export const createEnum = (name: string, values: [string, ...string[]]) =>
	pgEnum(`kiban_${name}`, values);
