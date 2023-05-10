import {
    Alert,
    Box,
    Button,
    Card,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Input,
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
import { Controller, useForm } from 'react-hook-form';
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
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm<UserPreferencesForm>({
        defaultValues: defaultFormData,
    });
    const [disabled, setDisabled] = React.useState(true);

    const handleCancelEdit = () => {
        setDisabled(true);
        reset(defaultFormData);
    };

    const onSubmit = (data: any) => {
        alert(JSON.stringify(data));
        reset();
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
                            <Controller
                                name="sharedUser"
                                control={control}
                                defaultValue={formData.sharedUser}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <FormControl
                                        fullWidth
                                        disabled={disabled}
                                        required
                                    >
                                        <Tooltip
                                            title="The user that will split transactions 50/50 by default"
                                            arrow
                                            placement="left-start"
                                        >
                                            <InputLabel>Shared User</InputLabel>
                                        </Tooltip>
                                        <Select {...field} label={field.name}>
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
                                )}
                            />
                            <Controller
                                name="currency"
                                control={control}
                                defaultValue={formData.currency}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <FormControl
                                        fullWidth
                                        disabled={disabled}
                                        required
                                    >
                                        <InputLabel>Currency</InputLabel>
                                        <Select {...field} label={field.name}>
                                            <MenuItem value="usd">
                                                $ USD
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name="language"
                                control={control}
                                defaultValue={formData.language}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <FormControl
                                        fullWidth
                                        disabled={disabled}
                                        required
                                    >
                                        <InputLabel>Language</InputLabel>
                                        <Select {...field} label={field.name}>
                                            <MenuItem value="en">
                                                English
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name="timezone"
                                control={control}
                                defaultValue={formData.timezone}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <FormControl
                                        fullWidth
                                        required
                                        disabled={disabled}
                                    >
                                        <InputLabel>Timezone</InputLabel>
                                        <Select
                                            {...field}
                                            defaultValue={formData.timezone}
                                            label={field.name}
                                        >
                                            <MenuItem value="America/Chicago">
                                                America/Chicago
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name="theme"
                                control={control}
                                defaultValue={formData.theme}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <>
                                        <InputLabel>Theme</InputLabel>
                                        <RadioGroup
                                            {...field}
                                            defaultValue={formData.theme}
                                        >
                                            <FormControlLabel
                                                value="dark"
                                                control={<Radio />}
                                                label="Dark"
                                                disabled={disabled}
                                            />
                                            <FormControlLabel
                                                value="light"
                                                control={<Radio />}
                                                label="Light"
                                                disabled={disabled}
                                            />
                                        </RadioGroup>
                                    </>
                                )}
                            />
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
