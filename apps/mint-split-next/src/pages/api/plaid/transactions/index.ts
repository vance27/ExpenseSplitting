import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_SANDBOX_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SANDBOX_CLIENT_SECRET,
        },
    },
});

export default async function handler(req: any, res: any) {
    const plaidClient = new PlaidApi(configuration);
    const json = JSON.parse(req.body);
    plaidClient
        .accountsGet({
            access_token: json.access_token,
        })
        .then((response) => {
            console.log(response.data.accounts);
            return res.status(200).json({ accounts: response.data.accounts });
        })
        .catch((e) => {
            console.error(e);
            return res.status(500).json({ error: e });
        });
}
