import { Card, Grid } from '@mui/material';
import { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import prisma from '../prisma/prisma';
import OwedDisplay from '../components/owed-display';
import AuthorizedUsersDisplay from '../components/authorized-users-display';
import CurrentExpenseSplittingWindow from '../components/current-expense-splitting-window';
import GetData from '../components/get-data';
import { getSession } from 'next-auth/react';
import { User } from '@prisma/client';
import { getAllTransactionsInExpenseSplittingWindowForAuthorizedUsers } from '../services/transaction.service';

export const getServerSideProps = async (context: any) => {
    const { id } = context.query;
    const session = await getSession(context);
    const authorizedUserTransactions =
        await getAllTransactionsInExpenseSplittingWindowForAuthorizedUsers(
            session?.user?.id
        );
    console.log(authorizedUserTransactions);

    return {
        props: { id: id ?? null, session: session },
    };
};

function Dashboard({ id, session }: { id: any; session: any }) {
    return (
        <>
            {session ? <div>Welcome {session.session.user.name} </div> : null}
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
                        <CurrentExpenseSplittingWindow props={undefined} />
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

export default Dashboard;
