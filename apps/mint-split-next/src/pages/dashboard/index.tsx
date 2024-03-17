import { Card, Grid, Typography } from '@mui/material';
import CurrentExpenseSplittingWindow from '../../components/dashboard/current-expense-splitting-window';
import OwedDisplay from '../../components/dashboard/owed-display';
import { trpc } from '../../utils/trpc';

function Dashboard() {
    const banks = trpc.user.getBanks.useQuery();

    const transactions = trpc.plaid.getTransactions.useQuery({
        access_token: banks?.data?.[0]?.accessToken,
        cursor: undefined,
        count: undefined,
    });
    const userTransactions = [];
    const amountOwed = 0;

    return (
        <>
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

                <Grid item xs={12} md={12}>
                    <Card variant="outlined">
                        {transactions.isLoading ? (
                            <div>Loading...</div>
                        ) : transactions.error ? (
                            <div>Error: {transactions.error.message}</div>
                        ) : (
                            <Grid container columns={12}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        New Transactions (
                                        {transactions.data?.added.length})
                                    </Typography>
                                    {transactions.data?.added.map(
                                        (transaction) => {
                                            return (
                                                <>
                                                    <div>
                                                        {transaction.name} -{' '}
                                                        {transaction.amount}
                                                    </div>
                                                </>
                                            );
                                        }
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        Modified Transactions (
                                        {transactions.data?.modified.length})
                                    </Typography>
                                    {transactions.data?.modified.map(
                                        (transaction) => {
                                            return (
                                                <>
                                                    <div>
                                                        {transaction.name} -{' '}
                                                        {transaction.amount}
                                                    </div>
                                                </>
                                            );
                                        }
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        Removed Transactions (
                                        {transactions.data?.removed.length})
                                    </Typography>
                                    {transactions.data?.removed.map(
                                        (transaction) => {
                                            return (
                                                <>
                                                    <div>
                                                        {
                                                            transaction.transaction_id
                                                        }
                                                    </div>
                                                </>
                                            );
                                        }
                                    )}
                                </Grid>
                            </Grid>
                        )}
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

export default Dashboard;
