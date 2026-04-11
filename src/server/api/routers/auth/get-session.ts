import { publicProcedure } from "../../trpc";

/**
 * Retrieves current session and user information (public access).
 *
 * Business Rules:
 * - Public procedure - accessible without authentication
 * - Returns current session data and associated user
 * - Used for client-side session management
 *
 * @returns Object containing session and user data
 *
 * @example
 * ```typescript
 * const { session, user } = await api.auth.getSession.query();
 * ```
 */
export const getSession = publicProcedure.query(({ ctx }) => ({
  session: ctx.session,
  user: ctx.user,
}));
