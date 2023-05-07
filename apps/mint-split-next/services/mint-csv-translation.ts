import Papa from 'papaparse';
import {
    MintCsvRow,
    MintCsvSchema,
    SharedTransactionSchema,
    TransactionBulkSchema,
    TransactionSchema,
} from '../components/zod/transactions';

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

// TODO: convert to server side functions WILL HAVE TO USE DB
export function MintCsvTranslation(data: any): TransactionBulkSchema {
    return MintCsvSchema.parse(data.filter(PrepareRawMintCsv))
        .filter(FilterWithPreferences)
        .map(TransformMintCsvToMintSplit);
}

function PrepareRawMintCsv(row: MintCsvRow): Boolean {
    // Check For header row
    if (
        row.date === 'Date' &&
        row.description === 'Description' &&
        row.originalDescription === 'Original Description' &&
        row.amount === 'Amount' &&
        row.transactionType === 'Transaction Type' &&
        row.category === 'Category' &&
        row.accountName === 'Account Name' &&
        row.labels === 'Labels' &&
        row.notes === 'Notes'
    ) {
        return false;
    }
    return true;
}

function FilterWithPreferences(row: MintCsvRow): Boolean {
    return true;
}

// TODO: update date so that sorting makes more sense
function TransformMintCsvToMintSplit(row: MintCsvRow): TransactionSchema {
    return {
        title: row.description,
        date: row.date,
        notes: row.notes,
        price: Math.round(parseFloat(row.amount) * 100),
        userId: 0, //TODO: get user id from context
        id: row.id,
        shared: row.shared ? CreateSharedTransaction(row) : undefined,
        userName: row.userName,
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
    userName: string,
    handleResult: (data: MintCsvSchema) => any
): void {
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
                    shared: false,
                    userName: userName ?? 'NO USER SET',
                };
            });
            handleResult(res);
        },
    });
}
