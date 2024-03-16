import { z } from 'zod';
import { exchangePublicToken, getLinkToken } from '../../services/plaid';
import { getUserBanks } from '../../services/user.service';
import { protectedProcedure, router } from '../trpc';

export const userRouter = router({
    getBanks: protectedProcedure.query(async (req) => {
        return await getUserBanks(req.ctx.id);
    }),
});
