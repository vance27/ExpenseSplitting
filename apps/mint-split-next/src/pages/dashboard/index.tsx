import { Card, Grid } from '@mui/material';
import CurrentExpenseSplittingWindow from '../../components/dashboard/current-expense-splitting-window';
import OwedDisplay from '../../components/dashboard/owed-display';

function Dashboard() {
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
            </Grid>
        </>
    );
}

export default Dashboard;
