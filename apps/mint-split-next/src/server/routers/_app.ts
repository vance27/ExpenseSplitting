import { router } from '../trpc';
import { plaidRouter } from './plaid';
import { userRouter } from './user';

export const appRouter = router({
    user: userRouter,
    plaid: plaidRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
