import { Button, Card, Grid } from '@mui/material';
import { ReactElement, useState } from 'react';
import { getTransaction, getUsers } from '../services/transaction.service';

function OwedDisplay(): ReactElement {
    return <div>Current Amount Owed $0.00</div>;
}

function CurrentExpenseSplittingWindow(): ReactElement {
    const [transactions, setTransactions] = useState([]);

    return (
        <div>
            Current Expense Splitting Window
            <div>Transactions Display</div>
            {transactions.length ? (
                <div>Transactions</div>
            ) : (
                <div>No Transactions</div>
            )}
        </div>
    );
}

function AuthorizedUsersDisplay(props: any): ReactElement {
    return (
        <div>
            Authorized Users
            <CurrentExpenseSplittingWindow />
        </div>
    );
}

function GetData(): ReactElement {
    const [users, setUsers] = useState([]);
    const [transaction, setTransaction] = useState<any>(null);
    const getUsersLocal = async () => {
        const users = await getUsers();
        setUsers(users);
    };

    const getTransactionLocal = async () => {
        const transaction = await getTransaction({ id: '1' });
        setTransaction(transaction);
    };
    return (
        <>
            <div>GetData</div>
            <Button variant="contained" onClick={getUsersLocal}>
                Get Users {users.length}
            </Button>
            <Button variant="contained" onClick={getTransactionLocal}>
                Get Transaction
            </Button>
            {users.length ? (
                <ul>
                    {users.map((user: any) => (
                        <li key={user.id}>
                            Id: {user.id}, Name: {user.name}, Email:
                            {user.email}
                        </li>
                    ))}
                </ul>
            ) : null}
            {transaction ? (
                <ul>
                    <li key={transaction.id}>
                        Id: {transaction.id}, Title: {transaction.title}, Notes:
                        {transaction.notes}, UserId:
                        {transaction.userId}
                    </li>
                </ul>
            ) : null}
        </>
    );
}

export default function Dashboard(): ReactElement {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                        <OwedDisplay />
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                        <AuthorizedUsersDisplay />
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                        <GetData />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                        <CurrentExpenseSplittingWindow />
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}
