import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import {
    Configuration,
    PlaidEnvironments,
    PlaidApi,
    LinkTokenCreateRequest,
    CountryCode,
    Products,
} from 'plaid';
import Link from 'next/link';
import { ProductionQuantityLimitsTwoTone } from '@mui/icons-material';
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
    console.log('plaid');
    const session = await getServerSession(req, res, authOptions);
    if (
        session &&
        process.env.PLAID_SANDBOX_CLIENT_ID &&
        process.env.PLAID_SANDBOX_CLIENT_SECRET
    ) {
        const plaidClient = new PlaidApi(configuration);
        plaidClient
            .linkTokenCreate({
                user: {
                    client_user_id: process.env.PLAID_SANDBOX_CLIENT_ID,
                },
                client_name: 'Mint Split',
                products: [Products.Transactions],
                language: 'en',
                country_codes: [CountryCode.Us],
            })
            .then((response) => {
                console.log(response.data.link_token);
                return res
                    .status(200)
                    .json({ link_token: response.data.link_token });
            })
            .catch((e) => {
                console.error(e);
                return res.status(500).json({ error: e });
            });
        // return res.status(200).json({ message: 'Connected to plaid' });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}
