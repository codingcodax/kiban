import { pgEnum, pgTableCreator } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `kiku_${name}`);

export const createEnum = (name: string, values: [string, ...string[]]) =>
  pgEnum(`kiku_${name}`, values);
