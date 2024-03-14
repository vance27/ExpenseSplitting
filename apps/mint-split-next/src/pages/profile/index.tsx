import { Button } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { getUserBanks } from '../../services/user.service';

export default function Profile(props: { banks: any[] }) {
    const [linkToken, setLinkToken] = useState('');
    const [banks, setBanks] = useState([]);

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
                    bankMetadata: metadata,
                }),
            })
                .then(async (res) => {
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
                const json = await res.json();
                setLinkToken(json.link_token);
                open();
                return;
            })
            .catch((e) => {
                console.log(e);
                return;
            });
    };
    const [accounts, setAccounts] = useState([]); // [
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
                setAccounts(json.accounts);
                console.log(json);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        onConnectToBank();
    }, []);

    return (
        <>
            <Button variant="outlined" onClick={() => open()} disabled={!ready}>
                New Bank Account +
            </Button>
            <Button variant="outlined" onClick={getAccounts}>
                Get Accounts
            </Button>
            <div>
                {accounts?.map((account: any) => (
                    <div key={account.account_id}>{account.name}</div>
                ))}
            </div>
        </>
    );
}

export const getServerSideProps = async (context: any) => {
    const session = await getSession(context);
    if (session?.id) {
        getUserBanks(session.id)
            .then((res) => {
                console.log(res);
                return {
                    banks: res,
                };
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return {
        props: {
            banks: [],
        },
    };
};
