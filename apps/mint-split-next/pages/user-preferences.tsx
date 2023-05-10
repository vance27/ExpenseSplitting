import {
    Alert,
    Box,
    Button,
    Card,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Tooltip,
    Typography,
} from '@mui/material';
import { getServerSession } from 'next-auth';
import React from 'react';
import { ReactElement } from 'react';
import { authOptions } from './api/auth/[...nextauth]';
import { Lock } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import StructuredGrid from '../components/structured-form';

export type UserPreferencesForm = {
    sharedUser: string;
    currency: string;
    language: string;
    timezone: string;
    theme: string;
};

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
            userPreferences: userPreferences,
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
    const defaultFormData: UserPreferencesForm = {
        sharedUser: userPreferences?.sharedUser ?? '',
        currency: userPreferences?.currency ?? '',
        language: userPreferences?.language ?? '',
        timezone: userPreferences?.timezone ?? '',
        theme: userPreferences?.theme ?? '',
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<UserPreferencesForm>({
        defaultValues: defaultFormData,
    });
    const [disabled, setDisabled] = React.useState(true);

    const handleCancelEdit = () => {
        setDisabled(true);
    };

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    const formData = defaultFormData;

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
                        {`${userPreferences ? 'Update' : 'Create'}`} {title}
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <StructuredGrid spacing={2}>
                            <FormControl fullWidth required disabled={disabled}>
                                <Tooltip
                                    title="The user that will split transactions 50/50 by default"
                                    arrow
                                    placement="left-start"
                                >
                                    <InputLabel>Shared User</InputLabel>
                                </Tooltip>
                                <Select
                                    defaultValue={formData.sharedUser}
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
                            <FormControl fullWidth required disabled={disabled}>
                                <InputLabel>Currency</InputLabel>
                                <Select
                                    defaultValue={formData.currency}
                                    label="Currency"
                                    required
                                >
                                    <MenuItem value="usd">$ USD</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth required disabled={disabled}>
                                <FormLabel>Language</FormLabel>
                                <Select
                                    defaultValue={formData.currency}
                                    label="Language"
                                >
                                    <MenuItem value="en">English</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth required disabled={disabled}>
                                <FormLabel>Timezone</FormLabel>
                                <Select
                                    defaultValue={formData.timezone}
                                    label="Timezone"
                                >
                                    <MenuItem value="America/Chicago">
                                        America/Chicago
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth disabled={disabled}>
                                <FormLabel>Theme</FormLabel>
                                <RadioGroup defaultValue={formData.theme}>
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
                        </StructuredGrid>

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
                                    <Button onClick={handleCancelEdit}>
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        value="Submit"
                                    >
                                        Save
                                    </Button>
                                </>
                            )}
                        </Box>
                    </form>
                </Card>
            </Container>
        </div>
    );
}

export default UserPreferences;
