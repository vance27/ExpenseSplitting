import { CheckBox, RadioButtonChecked } from '@mui/icons-material';
import {
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

export const getServerSideProps = async (context) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );
    const authorizedUsers = session?.authorizedUsers ?? [];
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
}: {
    title: any;
    authorizedUsers: any[];
}): ReactElement {
    const [disabled, setDisabled] = React.useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit');
    };

    return (
        <div>
            <Container maxWidth="sm">
                <Card sx={{ p: 2, mt: 2 }}>
                    <Typography sx={{ color: 'primary.light' }}>
                        Update {title}
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Default Shared User</InputLabel>
                                    <Select label="Default Shared User">
                                        {authorizedUsers?.map((user) => (
                                            <MenuItem value={user.id}>
                                                {user.name} [{user.email}]
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Currency</InputLabel>
                                    <Select label="Currency">
                                        <MenuItem value="usd">$ USD</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <FormLabel>Language</FormLabel>
                                    <Select label="Language">
                                        <MenuItem value="en">English</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <FormLabel>Default Timezone</FormLabel>
                                    <Select>
                                        <MenuItem value="America/Chicago">
                                            America/Chicago
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
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
                            <Button onClick={() => setDisabled(!disabled)}>
                                Edit Form
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
