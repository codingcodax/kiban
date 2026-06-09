import { describe, expect, it } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
	it('merges tailwind classes correctly', () => {
		const result = cn('px-2 py-2', 'px-4');
		expect(result).toBe('py-2 px-4');
	});

	it('handles conditional classes', () => {
		const result = cn('px-2', 'py-2');
		expect(result).toBe('px-2 py-2');
	});
});
