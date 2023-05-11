import { ReactElement } from 'react';
import { authOptions } from '../api/auth/[...nextauth]';
import { getAuthorizedUsers } from 'apps/mint-split-next/services/user.service';
import { getServerSession } from 'next-auth';
import {
    Avatar,
    Card,
    CardContent,
    Container,
    IconButton,
    Paper,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import React from 'react';
import { User } from '@prisma/client';

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

const SearchBar = ({ setSearchQuery }: any): ReactElement => {
    return (
        <form>
            <TextField
                id="search-bar"
                className="text"
                onInput={(e) => {
                    setSearchQuery(e.target.value);
                }}
                label="Search for friends"
                variant="outlined"
                placeholder="Search..."
                size="small"
            />
            <IconButton type="submit" aria-label="search">
                <Search style={{ fill: 'blue' }} />
            </IconButton>
        </form>
    );
};

const filterData = (query: string, data: User[]) => {
    if (!query) {
        return data;
    } else {
        return data.filter((d) => d?.name?.toLowerCase().includes(query));
    }
};

// TODO: change this to all users instead of just authorized
function FriendsPage(props: any): ReactElement {
    const [searchQuery, setSearchQuery] = React.useState('');
    const dataFiltered = filterData(
        searchQuery,
        props?.session?.authorizedUsers
    );

    return (
        <>
            <Paper elevation={4} sx={{ m: 2, p: 2 }}>
                {props.session?.authorizedUsers?.length > 0 ? (
                    <Typography variant="h6" component="h4">
                        Welcome {props.session?.user?.name.split(' ')[0]}. Here
                        are your friends:
                    </Typography>
                ) : (
                    <Typography variant="h6" component="h4">
                        Welcome {props.session?.user?.name.split(' ')[0]}. You
                        have no friends yet.
                    </Typography>
                )}

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
                                        <Avatar
                                            alt={user.name}
                                            src={user.image}
                                        />
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
            </Paper>
            <Paper elevation={4} sx={{ m: 2, p: 2 }}>
                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <div style={{ padding: 3 }}>
                    Top Users:
                    {dataFiltered.map((d) => (
                        <div
                            className="text"
                            style={{
                                padding: 5,
                                justifyContent: 'normal',
                                fontSize: 20,
                                color: 'blue',
                                margin: 1,
                                width: '250px',
                                borderColor: 'green',
                                borderWidth: '10px',
                            }}
                            key={d?.id}
                        >
                            {d?.name}
                        </div>
                    ))}
                </div>
            </Paper>
        </>
    );
}

export default FriendsPage;
