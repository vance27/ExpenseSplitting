// pages/api/auth/[...nextauth].ts

import { NextApiHandler } from 'next';
import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import prisma from 'apps/mint-split-next/prisma/prisma';
import {
    getAuthorizedUsers,
    getUserBanks,
    getUserPreferences,
} from 'apps/mint-split-next/src/services/user.service';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

const authHandler: NextApiHandler = (req, res) =>
    NextAuth(req, res, authOptions);
export default authHandler;

export const authOptions: NextAuthOptions = {
    session: {
        // strategy: 'jwt', // TODO: should be doing this???
        strategy: 'database',
        maxAge: 30 * 60, // 15 minutes
        updateAge: 5 * 60,
    },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
    ],
    callbacks: {
        session: async ({
            session,
            token,
            user,
        }: {
            session: Session;
            token: JWT;
            user: AdapterUser;
        }) => {
            const authorizedUsers = await getAuthorizedUsers(user?.id);
            const userPreferences = await getUserPreferences(user?.id);
            const banks = await getUserBanks(user?.id);

            session.authorizedUsers = authorizedUsers;
            session.userPreferences = userPreferences;
            session.id = user?.id;
            console.log('session.id', session.id);
            session.banks = banks;

            return session;
        },
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
};
