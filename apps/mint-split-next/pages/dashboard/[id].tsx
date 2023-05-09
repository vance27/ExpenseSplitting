import { Card, Grid } from '@mui/material';
import { getSession } from 'next-auth/react';
import CurrentExpenseSplittingWindow from '../../components/current-expense-splitting-window';
import GetData from '../../components/get-data';
import OwedDisplay from '../../components/owed-display';
import {
    getAllTransactionsInExpenseSplittingWindow,
    getAllTransactionsInExpenseSplittingWindowForAuthorizedUsers,
    getUserAmountOwed,
} from '../../services/transaction.service';

export const getServerSideProps = async (context: any) => {
    const { id } = context.query;
    const session = await getSession(context);
    const userTransactions = await getAllTransactionsInExpenseSplittingWindow(
        id
    );
    const authorizedUserTransactions =
        await getAllTransactionsInExpenseSplittingWindowForAuthorizedUsers(id);
    const amountOwed = await getUserAmountOwed(id);

    return {
        props: {
            id: id ?? null,
            session: session,
            userTransactions: JSON.parse(JSON.stringify(userTransactions)),
            authorizedtransactions: JSON.parse(
                JSON.stringify(authorizedUserTransactions)
            ),
            amountOwed: amountOwed,
        },
    };
};

function Dashboard({
    id,
    session,
    userTransactions,
    authorizedtransactions,
    amountOwed,
}: {
    id: any;
    session: any;
    userTransactions: any;
    authorizedtransactions: any;
    amountOwed: number;
}) {
    return (
        <>
            {session ? <div>Welcome {session?.user?.name} </div> : null}
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                        <OwedDisplay amount={amountOwed} />
                    </Card>
                </Grid>
                {/* TODO: add authorized users section<Grid item xs={12} md={4}>
                    <Card variant="outlined">
                        <AuthorizedUsersDisplay />
                    </Card>
                </Grid> */}
                <Grid item xs={12} md={12}>
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
