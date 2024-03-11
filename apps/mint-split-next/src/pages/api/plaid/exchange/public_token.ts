import { addUserBank } from 'apps/mint-split-next/src/services/user.service';
import { getServerSession } from 'next-auth';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
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
        .then((response) => {
            console.log(response.data);
            console.log(
                'access_token to add a bank: ',
                response.data.access_token
            );
            addUserBank(response.data.access_token, 'Bank', session?.id ?? '');
            return res.status(200).json(response.data);
        })
        .catch((e) => {
            console.error(e);
            return res.status(500).json({ error: e });
        });
}
