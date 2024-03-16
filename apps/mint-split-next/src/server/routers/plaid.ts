import { z } from 'zod';
import { getLinkToken, exchangePublicToken } from '../../services/plaid';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export const plaidRouter = router({
    getLinkToken: publicProcedure.query(async () => {
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
