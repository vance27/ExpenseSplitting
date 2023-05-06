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
    return prisma.expenseSplittingWindow.findMany({
        where: {
            authorizedUsers: {
                some: {
                    id,
                },
            },
        },
    });
}

export async function postBulkTransactions(data: Transaction[]): Promise<any> {
    return prisma.transaction.createMany({ data });
}

export async function postTransaction(data: Transaction): Promise<any> {
    return prisma.transaction.create({ data });
}
