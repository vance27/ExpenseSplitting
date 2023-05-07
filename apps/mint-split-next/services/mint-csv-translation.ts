import Papa from 'papaparse';
import {
    MintCsvRow,
    MintCsvSchema,
    SharedTransactionSchema,
    TransactionBulkSchema,
    TransactionSchema,
} from '../components/zod/transactions';
import { SharedTransaction } from '@prisma/client';

/**
 * Comes in as DATA: MintCsvSchema
 * Date
 * Description
 * Original Description
 * AmountTransaction
 * Type
 * Category
 * Account Name
 * Labels
 * Notes
 *
 * Needs to be filtered:
 * filterWithPreferences(DATA)
 *
 * Filtered data needs to be transformed into:
 * Title
 * Date
 * Notes
 * Price
 * Shared: SharedTransaction
 *   * SharedTransaction: {
 *      * transactionId: string
 *      * sharedPercentage: SharedPercentage[]
 *         * SharedPercentage: {
 *               * sharedPercentage: number
 *               * userId: string
 *               * sharedTransactionId: string
 * userId: string
 */

export function MintCsvTranslation(data: any): TransactionBulkSchema {
    console.log('mintcsvtranslation', data);
    return MintCsvSchema.parse(data)
        .filter(FilterWithPreferences)
        .map(TransformMintCsvToMintSplit);
}

function FilterWithPreferences(row: MintCsvRow): Boolean {
    return true;
}

// TODO: update date so that sorting makes more sense
function TransformMintCsvToMintSplit(row: MintCsvRow): TransactionSchema {
    return {
        title: row.description,
        date: new Date(row.date),
        notes: row.notes,
        price: Math.round(parseFloat(row.amount) * 100),
        shared: CreateSharedTransaction(row),
        userId: 0, //TODO: get user id from context
        id: row.id,
    };
}

function CreateSharedTransaction(row: MintCsvRow): SharedTransactionSchema {
    // TODO: CHECK prefereneces for shared transactions
    // if shared transaction, create shared transaction
    return {
        transactionId: '',
        userId: '',
        sharedPercentage: [],
    };
}

export function ParseMintCsv(
    file: File,
    handleResult: (data: MintCsvSchema) => any
): void {
    let result: MintCsvSchema = [];
    Papa.parse(file, {
        complete: function (results) {
            const res = results.data.map((item: any, index) => {
                return {
                    id: index,
                    date: item[0],
                    description: item[1],
                    originalDescription: item[2],
                    amount: item[3],
                    transactionType: item[4],
                    category: item[5],
                    accountName: item[6],
                    labels: item[7],
                    notes: item[8],
                };
            });
            handleResult(res);
        },
    });
}
