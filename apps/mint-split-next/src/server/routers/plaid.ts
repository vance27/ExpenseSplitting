import { Transaction } from '@prisma/client';
import { access } from 'fs';
import { z } from 'zod';
import {
    getLinkToken,
    exchangePublicToken,
    transactionsSync,
} from '../../services/plaid.service';
import { postBulkTransactions } from '../../services/transaction.service';
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
    getTransactions: protectedProcedure
        .input(
            z
                .object({
                    access_token: z.string().optional(),
                    cursor: z.string().optional(),
                    count: z.number().optional(),
                })
                .passthrough()
        )
        .query(async (req) => {
            const { data } = await transactionsSync(
                req.input.access_token ?? '',
                req.input.cursor,
                req.input.count,
                undefined
            );
            const addedTransactions: Transaction[] = data.added.map(
                (transaction) => {
                    return {
                        id: transaction.transaction_id,
                        title: transaction.name,
                        date: transaction.date,
                        userId: req.ctx.id,
                        price: transaction.amount,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        notes: '',
                        sharedId: null,
                        expenseSplittingWindowId: null,
                    };
                }
            );
            postBulkTransactions(addedTransactions);
            return data;
        }),
});
