import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';

export const createContext = async (opts: CreateNextContextOptions) => {
    const session = await getServerSession(opts.req, opts.res, authOptions);

    return {
        session,
    };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
