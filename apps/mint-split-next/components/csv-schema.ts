import Zod from 'zod';

// "Date","Description","Original Description","Amount","Transaction Type","Category","Account Name","Labels","Notes"
export const MintCsvRow = Zod.object({
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

export const MintCsvSchema = Zod.array(MintCsvRow);
export type MintCsvSchema = Zod.infer<typeof MintCsvSchema>;
