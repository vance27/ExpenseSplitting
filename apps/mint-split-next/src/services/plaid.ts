import {
    PlaidApi,
    Products,
    CountryCode,
    Configuration,
    PlaidEnvironments,
} from 'plaid';
import { type Session } from 'next-auth';
import { addBankAccounts, addUserBank } from './user.service';

const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_SANDBOX_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SANDBOX_CLIENT_SECRET,
        },
    },
});

export async function getLinkToken() {
    if (
        process.env.PLAID_SANDBOX_CLIENT_ID &&
        process.env.PLAID_SANDBOX_CLIENT_SECRET
    ) {
        const plaidClient = new PlaidApi(configuration);
        try {
            const res = await plaidClient.linkTokenCreate({
                user: {
                    client_user_id: process.env.PLAID_SANDBOX_CLIENT_ID,
                },
                client_name: 'Mint Split',
                products: [Products.Transactions],
                language: 'en',
                country_codes: [CountryCode.Us],
            });
            return res.data.link_token;
        } catch (e) {
            console.error(e);
            return null;
        }
    } else {
        throw new Error('Unauthorized');
    }
}

export async function exchangePublicToken(
    publicToken: string,
    metadata: any,
    id: string
) {
    const plaidClient = new PlaidApi(configuration);
    plaidClient
        .itemPublicTokenExchange({
            public_token: publicToken,
        })
        .then(async (response) => {
            console.log(response.data);
            console.log(
                'access_token to add a bank: ',
                response.data.access_token
            );
            const { name, institution_id } = metadata.institution;
            const newBank = await addUserBank(
                response.data.access_token,
                name,
                id,
                institution_id
            );
            addBankAccounts(
                newBank.accounts.map((account) => {
                    return {
                        type: account.type,
                        accountId: account.id,
                        name: account.name,
                        subtype: account.subtype,
                        userId: id,
                        bankId: newBank.id,
                    };
                })
            );
        })
        .catch((e) => {
            console.error(e);
        });
}
