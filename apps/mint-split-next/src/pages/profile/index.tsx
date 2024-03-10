import { Button } from '@mui/material';
import { useState } from 'react';
import {
    usePlaidLink,
    PlaidLinkOptions,
    PlaidLinkOnSuccess,
} from 'react-plaid-link';

export default function Profile() {
    const onClick = () => {
        console.log('clicked');
        fetch('/api/plaid', {
            method: 'POST',
        })
            .then(async (res) => {
                console.log(res);
                const json = await res.json();
                localStorage.setItem('link_token', json.link_token);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const [linkToken, setLinkToken] = useState('');
    const getLinkToken = () => {
        setLinkToken(localStorage.getItem('link_token') ?? '');
    };
    const { open, ready, error } = usePlaidLink({
        token: linkToken,
        onSuccess: (public_token, metadata) => {
            console.log('public_token: ', public_token);
            console.log('metadata: ', metadata);
        },
    });

    return (
        <>
            <Button variant="outlined" onClick={onClick}>
                Connect bank with plaid
            </Button>
            <Button variant="outlined" onClick={getLinkToken}>
                Get Link token:
            </Button>
            <div>{linkToken}</div>
            <Button variant="outlined" disabled={!ready} onClick={() => open()}>
                Connect bank with plaid
            </Button>
        </>
    );
}
