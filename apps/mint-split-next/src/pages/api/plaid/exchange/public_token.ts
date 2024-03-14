import {
    addBankAccounts,
    addUserBank,
} from 'apps/mint-split-next/src/services/user.service';
import { getServerSession } from 'next-auth';
import {
    BankIncomeCompleteResult,
    Configuration,
    PlaidApi,
    PlaidEnvironments,
} from 'plaid';
import { authOptions } from '../../auth/[...nextauth]';

const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_SANDBOX_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SANDBOX_CLIENT_SECRET,
        },
    },
});
export default async function handler(req, res) {
    const plaidClient = new PlaidApi(configuration);
    const json = JSON.parse(req.body);
    const session = await getServerSession(req, res, authOptions);
    console.log('session IS: ', session);
    plaidClient
        .itemPublicTokenExchange({
            public_token: json.public_token,
        })
        .then(async (response) => {
            console.log(response.data);
            console.log(
                'access_token to add a bank: ',
                response.data.access_token
            );
            const newBank = await addUserBank(
                response.data.access_token,
                json.bankMetadata.institution.name,
                session?.id ?? '',
                json.bankMetadata.institution.institution_id
            );
            addBankAccounts(
                json.bankMetadata.accounts.map((account) => {
                    return {
                        type: account.type,
                        accountId: account.id,
                        name: account.name,
                        subtype: account.subtype,
                        userId: session?.id ?? '',
                        bankId: newBank.id,
                    };
                })
            );
            return res.status(200).json(response.data);
        })
        .catch((e) => {
            console.error(e);
            return res.status(500).json({ error: e });
        });
}
