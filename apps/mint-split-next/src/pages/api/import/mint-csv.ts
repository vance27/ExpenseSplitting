import { Session, getServerSession } from 'next-auth';
import { ZodError } from 'zod';
import { authOptions } from 'apps/mint-split-next/src/pages/api/auth/[...nextauth]';
import Papa from 'papaparse';
import {
    MintCsvRow,
    MintCsvSchema,
    SharedTransactionSchema,
    TransactionBulkSchema,
    TransactionSchema,
} from '../../../components/zod/transactions';

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        try {
            const body = await postMintCsv(req, session);
            return res.status(200).json(body);
        } catch (e) {
            if (e instanceof ZodError) {
                res.status(400).json({
                    error: 'Error parsing file. Please verify the structure of the input file',
                });
            }
            if (e instanceof Error) {
                res.status(400).json({ error: e.message });
            }
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

async function postMintCsv(
    req: any,
    session: Session
): Promise<TransactionBulkSchema> {
    let transactions: TransactionBulkSchema = [];
    const handleParsedData = (data: MintCsvSchema): void => {
        try {
            transactions = MintCsvSchema.parse(data.filter(PrepareRawMintCsv))
                .filter(FilterWithPreferences)
                .map(TransformMintCsvToMintSplit(session));
        } catch (e) {
            throw e;
        }
    };

    req.body
        ? Papa.parse(req.body, {
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
                      };
                  });
                  handleParsedData(res);
              },
          })
        : null;

    return transactions;
}

function PrepareRawMintCsv(row: MintCsvRow): Boolean {
    // Filter out the header row
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
// TODO: add better sharedTransaction logic, take title into account (default to shared transaction)
function TransformMintCsvToMintSplit(
    session: Session
): (row: MintCsvRow) => TransactionSchema {
    return (row: MintCsvRow): TransactionSchema => {
        return {
            title: row.description,
            date: row.date,
            notes: row.notes,
            price: Math.round(parseFloat(row.amount) * 100),
            userId: 0, //TODO: get user id from context
            id: row.id,
            variable: row.shared ? [CreateSharedTransaction(row)] : undefined, //TODO: figure out display
            userName: session?.user?.name ?? '',
        };
    };
}

function CreateSharedTransaction(row: MintCsvRow): SharedTransactionSchema {
    // TODO: CHECK prefereneces for shared transactions
    // if shared transaction, create shared transaction
    return {
        transactionId: '',
        userId: '',
        userName: '',
        sharedPercentage: [],
    };
}
