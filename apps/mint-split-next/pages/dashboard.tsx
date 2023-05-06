import { Card, Grid } from '@mui/material';
import { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import prisma from '../prisma/prisma';
import OwedDisplay from '../components/owed-display';
import AuthorizedUsersDisplay from '../components/authorized-users-display';
import CurrentExpenseSplittingWindow from '../components/current-expense-splitting-window';
import GetData from '../components/get-data';
import { getAuthorizedUsers } from '../services/user.service';
import { getSession } from 'next-auth/react';
import { User } from '@prisma/client';
import { getServerSession } from 'next-auth';

export const getStaticProps: GetStaticProps = async () => {
    const users = await prisma.user.findMany();
    return {
        props: { users: users },
        revalidate: 30,
    };
};

export default function Dashboard({
    users,
    authorizedUsers,
}: {
    users: any[];
    authorizedUsers: any[];
}): ReactElement {
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
                {users.map((user: any) => (
                    <Grid item xs={12} md={6}>
                        <Card variant="outlined">
                            <div key={user.id}>
                                Id: {user.id}, Name: {user.name}, Email:
                                {user.email}
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
