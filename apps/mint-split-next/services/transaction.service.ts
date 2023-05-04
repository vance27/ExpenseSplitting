import prisma from '../prisma/prisma';

export type Transaction = any;

// TODO: Add types
export async function getAllTransactions(): Promise<any> {
    return prisma.transaction.findMany();
}

export async function postBulkTransactions(data: Transaction[]): Promise<any> {
    return prisma.transaction.createMany({ data });
}

export async function postTransaction(data: Transaction): Promise<any> {
    return prisma.transaction.create({ data });
}
