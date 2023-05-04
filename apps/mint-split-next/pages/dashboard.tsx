import { Box, Button, Grid } from '@mui/material';
import { ReactElement, useState } from 'react';

function OwedDisplay(): ReactElement {
    return <div>Current Amount Owed $0.00</div>;
}

function CurrentExpenseSplittingWindow(): ReactElement {
    return (
        <div>
            Current Expense Splitting Window
            <div>Transactions Display</div>
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
    const getUsers = async () => {
        const response = await fetch('http://localhost:3333/users');
        const users = await response.json();
        console.log(users);
        users.length ? setUsers(users) : setUsers([]);
    };
    const getTransactions = async () => {
        const response = await fetch('http://localhost:3333/transactions/1');
        const transactions = await response.json();
        console.log(transactions);
        setTransaction(transactions);
    };
    return (
        <>
            <div>GetData</div>
            <Button variant="contained" onClick={getUsers}>
                Get Users {users.length}
            </Button>
            <Button variant="contained" onClick={getTransactions}>
                Get Transactions
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
                    <AuthorizedUsersDisplay />
                </Grid>
                <Grid item xs={12} md={4}>
                    <OwedDisplay />
                </Grid>
                <Grid item xs={12} md={4}>
                    <GetData />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CurrentExpenseSplittingWindow />
                </Grid>
            </Grid>
        </>
    );
}
