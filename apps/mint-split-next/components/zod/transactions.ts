import { GridColDef } from '@mui/x-data-grid';
import Zod from 'zod';

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
    shared: Zod.boolean().default(false),
    userName: Zod.string().optional(),
});

export const MintCsvSchema = Zod.array(MintCsvRow);
export type MintCsvSchema = Zod.infer<typeof MintCsvSchema>;
export type MintCsvRow = Zod.infer<typeof MintCsvRow>;

export const SharedPercentageSchema = Zod.object({
    sharedPercentage: Zod.number().int().positive(),
    userId: Zod.string(),
    displayName: Zod.string(),
    sharedTransactionId: Zod.string(),
});

// TODO: add validation for shared percentage (sum of sharedPerecentages must be 100)
export const SharedTransactionSchema = Zod.object({
    transactionId: Zod.string(),
    userId: Zod.string(),
    userName: Zod.string(),
    sharedPercentage: Zod.array(SharedPercentageSchema),
});
export type SharedTransactionSchema = Zod.infer<typeof SharedTransactionSchema>;

export const TransactionSchema = Zod.object({
    title: Zod.string(),
    date: Zod.string(),
    notes: Zod.string().optional(),
    price: Zod.number().int().positive(),
    variable: SharedTransactionSchema.array().optional(),
    userId: Zod.number().int().positive(),
    userName: Zod.string(),
    id: Zod.number(),
});
export const TransactionBulkSchema = Zod.array(TransactionSchema);
export type TransactionBulkSchema = Zod.infer<typeof TransactionBulkSchema>;
export type TransactionSchema = Zod.infer<typeof TransactionSchema>;

export const TransactionBulkColumns: GridColDef[] = [
    {
        field: 'date',
        headerName: 'Date',
        width: 85,
        editable: true,
    },
    {
        field: 'userName',
        headerName: 'User',
        width: 140,
        editable: true,
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 350,
        editable: true,
    },
    {
        field: 'price',
        headerName: 'Cost',
        width: 160,
        editable: true,
        valueFormatter: ({ value }) => {
            value = value.toString();
            return `$${value.substr(0, value.length - 2)}.${value.substr(-2)}`;
        },
    },
    {
        field: 'variable',
        headerName: 'Equal Split ',
        width: 160,
        editable: true,
        valueFormatter: ({ value }) => (value ? 'No' : 'Yes'),
    },
    {
        field: 'notes',
        headerName: 'Notes',
        width: 160,
        editable: true,
    },
];