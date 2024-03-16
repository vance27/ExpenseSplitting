import { z } from 'zod';
import { UserPreferencesFormSchema } from '../../pages/user-preferences';
import {
    getAuthorizedUsers,
    getUserBanks,
    getUserPreferences,
    postUpdateUserPreferences,
} from '../../services/user.service';
import { protectedProcedure, router } from '../trpc';

export const userRouter = router({
    getBanks: protectedProcedure.query(async (req) => {
        return await getUserBanks(req.ctx.id);
    }),
    getUserPreferences: protectedProcedure.query(async (req) => {
        return await getUserPreferences(req.ctx.id);
    }),
    getAuthorizedUsers: protectedProcedure.query(async (req) => {
        return await getAuthorizedUsers(req.ctx.id);
    }),
    updateUserPreferences: protectedProcedure
        .input(
            z.object({
                preferences: UserPreferencesFormSchema,
            })
        )
        .mutation(async (req) => {
            return await postUpdateUserPreferences(
                req.input.preferences,
                req.ctx.session
            );
        }),
});
