import { Card, Grid } from '@mui/material';
import { getSession } from 'next-auth/react';
import CurrentExpenseSplittingWindow from '../../components/current-expense-splitting-window';
import GetData from '../../components/get-data';
import OwedDisplay from '../../components/owed-display';
import {
    getAllTransactionsInExpenseSplittingWindow,
    getAllTransactionsInExpenseSplittingWindowForAuthorizedUsers,
} from '../../services/transaction.service';

export const getServerSideProps = async (context: any) => {
    const { id } = context.query;
    const session = await getSession(context);
    const userTransactions = await getAllTransactionsInExpenseSplittingWindow(
        id
    );
    const authorizedUserTransactions =
        await getAllTransactionsInExpenseSplittingWindowForAuthorizedUsers(id);
    console.log('usertransactions', userTransactions);
    console.log('authorizedtransactions', authorizedUserTransactions);

    return {
        props: {
            id: id ?? null,
            session: session,
            userTransactions: JSON.parse(JSON.stringify(userTransactions)),
            authorizedtransactions: JSON.parse(
                JSON.stringify(authorizedUserTransactions)
            ),
        },
    };
};

function Dashboard({
    id,
    session,
    userTransactions,
    authorizedtransactions,
}: {
    id: any;
    session: any;
    userTransactions: any;
    authorizedtransactions: any;
}) {
    return (
        <>
            {session ? <div>Welcome {session.session.user.name} </div> : null}
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                        <OwedDisplay />
                    </Card>
                </Grid>
                {/* TODO: add authorized users section<Grid item xs={12} md={4}>
                    <Card variant="outlined">
                        <AuthorizedUsersDisplay />
                    </Card>
                </Grid> */}

                <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                        <GetData />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                        <CurrentExpenseSplittingWindow
                            transactions={userTransactions}
                        />
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

export default Dashboard;
