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
export default async function handler(req, res) {
    const plaidClient = new PlaidApi(configuration);
    const json = JSON.parse(req.body);
    console.log('HERERRRRR', json.access_token);
    plaidClient
        .itemPublicTokenExchange({
            public_token: json.public_token,
        })
        .then((response) => {
            console.log(response.data);
            return res.status(200).json(response.data);
        })
        .catch((e) => {
            console.error(e);
            return res.status(500).json({ error: e });
        });
}
