import { Search } from '@mui/icons-material';
import {
    Container,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { User } from '@prisma/client';
import { ReactElement, useState } from 'react';

const SearchBar = ({ setSearchQuery }: any): ReactElement => {
    return (
        <form>
            <TextField
                id="search-bar"
                className="text"
                onInput={(e) => {
                    setSearchQuery((e.target as HTMLTextAreaElement).value);
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

export default function FriendsPage(): ReactElement {
    const [searchQuery, setSearchQuery] = useState('');
    // const dataFiltered = filterData(searchQuery, props?.allUsers);
    // const handleAddFriend = async (friendId: number) => {};

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={4}>
                <Paper elevation={4} sx={{ m: 2, p: 2 }}>
                    {/* {session?.authorizedUsers?.length > 0 ? (
                        <Typography variant="h6" component="h4">
                            Welcome {session?.user?.name.split(' ')[0]}. Here
                            are your friends:
                        </Typography>
                    ) : (
                        <Typography variant="h6" component="h4">
                            Welcome {session?.user?.name.split(' ')[0]}. You
                            have no friends yet.
                        </Typography>
                    )} */}

                    <Container>
                        {/* {session?.authorizedUsers?.map((user: any) => {
                            return (
                                <FriendCard user={user} key={user.id}>
                                    <Button
                                        variant="text"
                                        color="primary"
                                        // onClick={}
                                    >
                                        - Remove friend
                                    </Button>
                                </FriendCard>
                            );
                        })} */}
                    </Container>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Paper elevation={4} sx={{ m: 2, p: 2 }}>
                    <Typography variant="h6" component="h4">
                        Sent:
                    </Typography>
                    <Container>
                        {/* {friendRequestsSent?.map((user: any) => {
                            return (
                                <FriendCard user={user} key={user.id}>
                                    <Typography
                                        variant="overline"
                                        display={'block'}
                                        component="div"
                                        sx={{
                                            color: 'gray',
                                        }}
                                        noWrap={true}
                                    >
                                        Request Sent
                                    </Typography>
                                    <Button variant="text" color="error">
                                        - Cancel request
                                    </Button>
                                </FriendCard>
                            );
                        })} */}
                    </Container>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Paper elevation={4} sx={{ m: 2, p: 2 }}>
                    <Typography variant="h6" component="h4">
                        Received:
                    </Typography>
                    <Container>
                        {/* {friendRequestsReceived?.map((user: any) => {
                            return (
                                <FriendCard user={user} key={user.id}>
                                    <Button
                                        variant="text"
                                        color="primary"
                                        // onClick={}
                                    >
                                        + Accept
                                    </Button>
                                </FriendCard>
                            );
                        })} */}
                    </Container>
                </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
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
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}
                    >
                        {/* {dataFiltered
                            .filter((user: User) => user.id !== session?.id)
                            .filter(
                                (user) =>
                                    props?.session?.authorizedUsers.filter(
                                        (authUser: User) =>
                                            authUser.id === user.id
                                    ).length === 0
                            )
                            .filter(
                                (user) =>
                                    props?.friendRequestsSent.filter(
                                        (authUser: User) =>
                                            authUser.id === user.id
                                    ).length === 0
                            )
                            .filter(
                                (user) =>
                                    props?.friendRequestsReceived.filter(
                                        (authUser: User) =>
                                            authUser.id === user.id
                                    ).length === 0
                            )
                            .map((d) => (
                                <FriendCard user={d} key={d?.id}>
                                    <Button
                                        variant="text"
                                        color="primary"
                                        // onClick={}
                                    >
                                        + Add as friend
                                    </Button>
                                </FriendCard>
                            ))} */}
                    </Container>
                </Paper>
            </Grid>
        </Grid>
    );
}
