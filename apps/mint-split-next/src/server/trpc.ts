import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create();

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = publicProcedure.use(async function isAuthed(
    opts
) {
    const session = opts.ctx.session;
    if (!session?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    } else {
        return opts.next({
            ctx: {
                // ✅ user value is known to be non-null now
                id: session.id,
                session,
            },
        });
    }
});
