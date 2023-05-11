import { ReactElement } from 'react';
import { authOptions } from '../api/auth/[...nextauth]';
import { getAuthorizedUsers } from 'apps/mint-split-next/services/user.service';
import { getServerSession } from 'next-auth';
import {
    Avatar,
    Card,
    CardContent,
    Container,
    Tooltip,
    Typography,
} from '@mui/material';

export const getServerSideProps = async (context: any) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );
    return {
        props: {
            session: session,
        },
    };
};

function FriendsPage(props: any): ReactElement {
    return (
        <>
            <Container>
                {props.session?.authorizedUsers?.map((user: any) => {
                    return (
                        <Tooltip title={user.name} placement="top">
                            <Card
                                sx={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                }}
                            >
                                <CardContent
                                    sx={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        display: 'flex',
                                        flex: '1 0 auto',
                                        maxWidth: 100,
                                        minWidth: 100,
                                    }}
                                >
                                    <Avatar alt={user.name} src={user.image} />
                                    <Typography
                                        noWrap
                                        variant="body1"
                                        display="block"
                                        sx={{
                                            textAlign: 'center',
                                            minWidth: 100,
                                            maxWidth: 100,
                                        }}
                                    >
                                        {user.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Tooltip>
                    );
                })}
            </Container>
        </>
    );
}

export default FriendsPage;
