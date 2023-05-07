import {
    MintCsvSchema,
    TransactionBulkSchema,
} from 'apps/mint-split-next/components/zod/transactions';
import {
    MintCsvTranslation,
    ParseMintCsv,
} from 'apps/mint-split-next/services/mint-csv-translation';
import { ZodError } from 'zod';

export default function handler(req: any, res: any) {
    try {
        const body = postMintCsv(req);
        res.status(200).json(body);
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
}

function postMintCsv(req: any): TransactionBulkSchema {
    const session = req.session;
    let transactions: TransactionBulkSchema = [];
    const handleParsedData = (data: MintCsvSchema): void => {
        try {
            transactions = MintCsvTranslation(data);
            console.log(transactions);
        } catch (e) {
            throw e;
        }
    };
    req.body
        ? ParseMintCsv(req.body, session?.session?.user?.name, handleParsedData)
        : null;
    return transactions;
}
