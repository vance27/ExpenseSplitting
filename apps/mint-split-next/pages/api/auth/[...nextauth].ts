// pages/api/auth/[...nextauth].ts

import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import prisma from 'apps/mint-split-next/prisma/prisma';
import { getAuthorizedUsers } from 'apps/mint-split-next/services/user.service';
import {
    getAllTransactionsInExpenseSplittingWindow,
    getAllTransactionsInExpenseSplittingWindowForAuthorizedUsers,
} from 'apps/mint-split-next/services/transaction.service';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
    ],
    callbacks: {
        session: async (session, user) => {
            const authorizedUsers = await getAuthorizedUsers(session.user.id);
            const transactions =
                await getAllTransactionsInExpenseSplittingWindow(
                    session.user.id
                );
            const authorizedUserTransactions =
                await getAllTransactionsInExpenseSplittingWindowForAuthorizedUsers(
                    authorizedUsers.map((user) => user.id)
                );
            session.authorizedUsers = authorizedUsers;
            session.user.currentTransactions = transactions;
            session.user.authorizedUserTransactions =
                authorizedUserTransactions;
            return session;
        },
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
};
