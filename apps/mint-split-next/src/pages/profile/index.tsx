import { Button } from '@mui/material';
import { useState } from 'react';
import {
    usePlaidLink,
    PlaidLinkOptions,
    PlaidLinkOnSuccess,
} from 'react-plaid-link';

export default function Profile() {
    const [linkToken, setLinkToken] = useState('');
    const [publicToken, setPublicToken] = useState('');

    const { open, ready, error } = usePlaidLink({
        token: linkToken,
        onSuccess: (public_token, metadata) => {
            console.log('public_token: ', public_token);
            console.log('metadata: ', metadata);
            localStorage.setItem('public_token', public_token);
            fetch('/api/plaid/exchange/public_token', {
                method: 'POST',
                body: JSON.stringify({
                    public_token: public_token,
                }),
            })
                .then(async (res) => {
                    console.log(res);
                    const json = await res.json();
                    localStorage.setItem('access_token', json.access_token);
                    console.log(json);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    });

    /**
     * Basically allows the user to begin the linking process.
     * @returns a link_token that will be used to link the user's bank account.
     */
    const onConnectToBank = () => {
        console.log('Begin connect bank with plaid');
        fetch('/api/plaid', {
            method: 'POST',
        })
            .then(async (res) => {
                console.log(res);
                const json = await res.json();
                localStorage.setItem('link_token', json.link_token);
                setLinkToken(json.link_token);
                open();
                return;
            })
            .catch((e) => {
                console.log(e);
                return;
            });
    };

    const getAccounts = () => {
        fetch('/api/plaid/transactions', {
            method: 'POST',
            body: JSON.stringify({
                access_token: localStorage.getItem('access_token'),
            }),
        })
            .then(async (res) => {
                console.log(res);
                const json = await res.json();
                console.log(json);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <>
            <Button variant="outlined" onClick={onConnectToBank}>
                Connect bank with plaid
            </Button>
            <div>Link Token: {linkToken}</div>
            <div>Public Token: {publicToken}</div>
            <Button variant="outlined" onClick={() => open()} disabled={!ready}>
                Open Plaid Link
            </Button>
            <Button variant="outlined" onClick={getAccounts}>
                Get Accounts
            </Button>
        </>
    );
}
