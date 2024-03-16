import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { trpc } from '../../utils/trpc';

export default function Profile() {
    const banks = trpc.user.getBanks.useQuery();
    const linkToken = trpc.user.getLinkToken.useQuery();
    const { open, ready, error } = usePlaidLink({
        token: linkToken.data ?? null,
        onSuccess: (public_token, metadata) => {
            trpc.user.exchangePublicToken.useMutation().mutate({
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
            <Button variant="outlined" onClick={() => open()} disabled={!ready}>
                New Bank Account +
            </Button>
        </>
    );
}

