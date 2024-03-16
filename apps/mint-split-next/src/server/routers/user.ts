import { z } from 'zod';
import { exchangePublicToken, getLinkToken } from '../../services/plaid';
import { getUserBanks } from '../../services/user.service';
import { protectedProcedure, router } from '../trpc';

export const userRouter = router({
    getBanks: protectedProcedure.query(async (req) => {
        return await getUserBanks(req.ctx.id);
    }),
    getLinkToken: protectedProcedure.query(async () => {
        return await getLinkToken();
    }),
    exchangePublicToken: protectedProcedure
        .input(
            z.object({
                public_token: z.string(),
                bankMetadata: z.object({
                    institution: z
                        .object({
                            name: z.string(),
                            institution_id: z.string(),
                        })
                        .nullable(),
                }),
            })
        )
        .mutation(async (req) => {
            const { public_token, bankMetadata } = req.input;
            return await exchangePublicToken(
                public_token,
                bankMetadata,
                req.ctx.id
            );
        }),
});
