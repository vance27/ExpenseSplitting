import Zod from 'zod';

// "Date","Description","Original Description","Amount","Transaction Type","Category","Account Name","Labels","Notes"
export const MintCsvRowSchema = Zod.object({
    date: Zod.string(),
    description: Zod.string(),
    originalDescription: Zod.string(),
    amount: Zod.string(),
    transactionType: Zod.string(),
    category: Zod.string(),
    accountName: Zod.string(),
    labels: Zod.string(),
    notes: Zod.string(),
    id: Zod.number(),
});

export const MintCsvSchema = Zod.array(MintCsvRowSchema);
export type MintCsvSchema = Zod.infer<typeof MintCsvSchema>;

export const TransactionSchema = Zod.object({
    title: Zod.string(),
    date: Zod.date(),
    notes: Zod.string().optional(),
    price: Zod.number().int().positive(),
    shared: Zod.boolean().optional(),
    sharedPercentage: Zod.number().int().positive().optional(),
    userId: Zod.number().int().positive(),
});
export const TransactionBulkSchema = Zod.array(TransactionSchema);

