import {
    Products,
    CountryCode,
    TransactionsSyncRequest,
    TransactionsSyncRequestOptions,
} from 'plaid';
import { plaidClient } from './plaid.config';
import { addBankAccounts, addUserBank } from './user.service';

const getClientId = () => {
    if (process.env.PLAID_SANDBOX_CLIENT_ID) {
        return process.env.PLAID_SANDBOX_CLIENT_ID;
    } else {
        throw new Error('No Client ID');
    }
};

const getSecret = () => {
    if (process.env.PLAID_SANDBOX_CLIENT_SECRET) {
        return process.env.PLAID_SANDBOX_CLIENT_SECRET;
    } else {
        throw new Error('No Secret');
    }
};

export async function getLinkToken() {
    const clientId = getClientId();
    try {
        const res = await plaidClient.linkTokenCreate({
            user: {
                client_user_id: clientId,
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
}

export async function exchangePublicToken(
    publicToken: string,
    metadata: any,
    id: string
) {
    plaidClient
        .itemPublicTokenExchange({
            public_token: publicToken,
        })
        .then(async (response) => {
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

export async function transactionsSync(
    access_token: string,
    cursor?: string,
    count?: number,
    options?: TransactionsSyncRequestOptions
) {
    const clientId = getClientId();
    const secret = getSecret();
    const req: TransactionsSyncRequest = {
        client_id: clientId,
        secret,
        access_token,
        cursor,
        count,
        options,
    };
    return await plaidClient.transactionsSync(req);
}
