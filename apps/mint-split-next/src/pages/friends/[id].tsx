import { ReactElement } from 'react';
import { authOptions } from '../api/auth/[...nextauth]';
import {
    getAllUsers,
    getAuthorizedUsers,
    getFriendRequests,
} from 'apps/mint-split-next/src/services/user.service';
import { getServerSession } from 'next-auth';
import {
    Avatar,
    Button,
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
import FriendCard from '../../components/friends/friend-card';

export const getServerSideProps = async (context: any) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );
    const allUsers = await getAllUsers();
    const currentFriendRequests = await getFriendRequests(session?.id);
    return {
        props: {
            session: session,
            allUsers: allUsers,
            friendRequests: currentFriendRequests,
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

const filterData = (query: string, data: User[]): User[] => {
    if (!query) {
        return data;
    } else {
        return data.filter((d) =>
            d?.name?.toLowerCase().includes(query.toLowerCase())
        );
    }
};

// TODO: change this to all users instead of just authorized
function FriendsPage(props: any): ReactElement {
    const [searchQuery, setSearchQuery] = React.useState('');
    const dataFiltered = filterData(searchQuery, props?.allUsers);
    console.log(props?.friendRequests);
    // const handleAddFriend = async (friendId: number) => {};

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
                            <FriendCard user={user} key={user.id}></FriendCard>
                        );
                    })}
                </Container>
            </Paper>
            <Paper elevation={4} sx={{ m: 2, p: 2 }}>
                <Typography variant="h6" component="h4">
                    Current Friend Requests:
                </Typography>
                <Container>
                    {props.friendRequests?.map((user: any) => {
                        return (
                            <FriendCard user={user} key={user.id}></FriendCard>
                        );
                    })}
                </Container>
            </Paper>
            <Paper
                elevation={4}
                sx={{
                    m: 2,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexDirection: 'column',
                }}
            >
                <Container sx={{ p: 2 }}>
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </Container>

                <Container
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    {dataFiltered
                        .filter((user: User) => user.id !== props.session?.id)
                        .filter(
                            (user) =>
                                props?.session?.authorizedUsers.filter(
                                    (authUser: User) => authUser.id === user.id
                                ).length === 0
                        )
                        .filter(
                            (user) =>
                                props?.friendRequests.filter(
                                    (authUser: User) => authUser.id === user.id
                                ).length === 0
                        ) // filter out current user, TODO: filter out current friends
                        .map((d) => (
                            <FriendCard user={d} key={d?.id}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    // onClick={}
                                >
                                    Add as friend
                                </Button>
                            </FriendCard>
                        ))}
                </Container>
            </Paper>
        </>
    );
}

export default FriendsPage;
