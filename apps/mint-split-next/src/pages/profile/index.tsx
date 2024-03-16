import { Button } from '@mui/material';
import { usePlaidLink } from 'react-plaid-link';
import { trpc } from '../../utils/trpc';

export default function Profile() {
    const banks = trpc.user.getBanks.useQuery();
    const linkToken = trpc.plaid.getLinkToken.useQuery();
    const exchangeToken = trpc.plaid.exchangePublicToken.useMutation();

    const { open, ready, error } = usePlaidLink({
        token: linkToken.data ?? null,
        onSuccess: (public_token, metadata) => {
            exchangeToken.mutate({
                public_token,
                bankMetadata: metadata,
            });
        },
    });

    return (
        <>
            {banks.data?.map((bank: any) => (
                <div key={bank.id}>{bank.name}</div>
            ))}
            {error && <div>Error {error.message}</div>}
            <Button variant="outlined" onClick={() => open()} disabled={!ready}>
                New Bank Account +
            </Button>
        </>
    );
}
