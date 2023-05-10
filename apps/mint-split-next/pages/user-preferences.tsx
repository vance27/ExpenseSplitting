import {
    Alert,
    Box,
    Button,
    Card,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Typography,
} from '@mui/material';
import { getServerSession } from 'next-auth';
import React from 'react';
import { ReactElement } from 'react';
import { authOptions } from './api/auth/[...nextauth]';
import { Lock } from '@mui/icons-material';

export const getServerSideProps = async (context) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );
    const authorizedUsers = session?.authorizedUsers ?? [];
    const userPreferences = session?.userPreferences ?? null;
    console.log(session);

    return {
        props: {
            title: 'User Preferences',
            authorizedUsers: authorizedUsers,
        },
    };
};

function UserPreferences({
    title,
    authorizedUsers,
    userPreferences,
}: {
    title: any;
    authorizedUsers: any[];
    userPreferences: any;
}): ReactElement {
    const [disabled, setDisabled] = React.useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit');
    };

    return (
        <div>
            {!userPreferences ? (
                <Alert severity="info">
                    Setting user preferences is required to import data
                </Alert>
            ) : null}
            <Container maxWidth="sm">
                <Card sx={{ p: 2, mt: 2 }}>
                    <Typography sx={{ color: 'primary.light', p: 2 }}>
                        Update {title}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FormControl
                                    fullWidth
                                    required
                                    disabled={disabled}
                                >
                                    <InputLabel>Shared User</InputLabel>
                                    <Select
                                        defaultValue={
                                            authorizedUsers?.[0]?.id ?? ''
                                        }
                                        label="Default Shared User"
                                    >
                                        {authorizedUsers?.map((user) => (
                                            <MenuItem
                                                key={`authUsers${user.id}`}
                                                value={user.id}
                                            >
                                                {user.name} [{user.email}]
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl
                                    fullWidth
                                    required
                                    disabled={disabled}
                                >
                                    <InputLabel>Currency</InputLabel>
                                    <Select
                                        defaultValue="usd"
                                        label="Currency"
                                        required
                                    >
                                        <MenuItem value="usd">$ USD</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl
                                    fullWidth
                                    required
                                    disabled={disabled}
                                >
                                    <FormLabel>Language</FormLabel>
                                    <Select defaultValue="en" label="Language">
                                        <MenuItem value="en">English</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl
                                    fullWidth
                                    required
                                    disabled={disabled}
                                >
                                    <FormLabel>Timezone</FormLabel>
                                    <Select defaultValue="America/Chicago">
                                        <MenuItem value="America/Chicago">
                                            America/Chicago
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth disabled={disabled}>
                                    <FormLabel>Theme</FormLabel>
                                    <RadioGroup defaultValue="dark">
                                        <FormControlLabel
                                            value="dark"
                                            control={<Radio />}
                                            label="Dark"
                                        />
                                        <FormControlLabel
                                            value="light"
                                            control={<Radio />}
                                            label="Light"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
                    <Box sx={{ flexGrow: 1 }} m={2}>
                        {disabled ? (
                            <Button
                                variant="contained"
                                onClick={() => setDisabled(!disabled)}
                            >
                                Edit Preferences
                                <Lock />
                            </Button>
                        ) : (
                            <>
                                <Button onClick={() => setDisabled(!disabled)}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    value="Submit"
                                    onClick={handleSubmit}
                                >
                                    Save
                                </Button>
                            </>
                        )}
                    </Box>
                </Card>
            </Container>
        </div>
    );
}

export default UserPreferences;
