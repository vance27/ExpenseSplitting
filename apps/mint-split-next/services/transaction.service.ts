import prisma from '../prisma/prisma';

export type Transaction = any;

// TODO: Add types
export async function getAllTransactions(id: string): Promise<any> {
    return prisma.transaction.findMany({
        where: {
            userId: id,
        },
    });
}

export async function getAllTransactionsInExpenseSplittingWindow(
    id: string
): Promise<any> {
    const expenseSplittingWindow = await prisma.expenseSplittingWindow.findMany(
        {
            where: {
                authorizedUsers: {
                    some: {
                        id,
                    },
                },
            },
            include: {
                transactions: true,
            },
        }
    );
    return expenseSplittingWindow.flatMap((window) => window.transactions);
}

export async function getAllTransactionsInExpenseSplittingWindowForAuthorizedUsers(
    authorizedUsers: any[]
) {
    const transactions = await prisma.expenseSplittingWindow.findMany({
        where: {
            authorizedUsers: {
                some: {
                    id: {
                        in: authorizedUsers,
                    },
                },
            },
        },
        include: {
            transactions: true,
        },
    });
    return transactions.flatMap((window) => window.transactions);
}

export async function getUserAmountOwed(id: string): Promise<any> {
    const sharedPercentages = await prisma.sharedPercentage.findMany({
        where: {
            userId: id,
        },
        include: {
            sharedTransaction: {
                include: {
                    transaction: true,
                },
            },
        },
    });
    return sharedPercentages.reduce(
        (acc, curr) =>
            acc +
            Math.round(
                curr.sharedTransaction.transaction.price * (curr.sharedPercentage/100)
            ),
        0
    );
}

export async function postBulkTransactions(data: Transaction[]): Promise<any> {
    return prisma.transaction.createMany({ data });
}

export async function postTransaction(data: Transaction): Promise<any> {
    return prisma.transaction.create({ data });
}
