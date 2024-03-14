import {
    Alert,
    Box,
    Button,
    Card,
    Container,
    FormControl,
    FormControlLabel,
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
import { Controller, useForm } from 'react-hook-form';
import StructuredGrid from '../components/ui-lib-candidates/structured-form';
import Zod from 'zod';
import { InferGetServerSidePropsType } from 'next';
import { Bank } from '@prisma/client';

export const UserPreferencesFormSchema = Zod.object({
    updatedAt: Zod.string().optional(),
    splittingUserId: Zod.string().optional(),
    currency: Zod.string().optional(),
    language: Zod.string().optional(),
    timezone: Zod.string().optional(),
    theme: Zod.string().optional(),
    dateFormat: Zod.string().optional(),
    timeFormat: Zod.string().optional(),
    preferredSort: Zod.string().optional(),
});

export const UserPreferencesSchema = UserPreferencesFormSchema.extend({
    id: Zod.string(),
    userId: Zod.string(),
    createdAt: Zod.date(),
});
export type UserPreferencesType = Zod.infer<typeof UserPreferencesSchema>;
export type UserPreferencesForm = Zod.infer<typeof UserPreferencesFormSchema>;

export const getServerSideProps = async (context: any) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );
    const authorizedUsers = session?.authorizedUsers ?? [];
    const userPreferences = session?.userPreferences ?? null;
    const banks = session?.banks ?? [];

    return {
        props: {
            title: 'User Preferences',
            authorizedUsers: authorizedUsers,
            userPreferences: userPreferences,
            banks: JSON.parse(JSON.stringify(banks)) as Bank[],
        },
    };
};

function UserPreferences({
    title,
    authorizedUsers,
    userPreferences,
    banks,
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
    const defaultFormData: UserPreferencesForm = {
        splittingUserId: userPreferences?.splittingUserId,
        currency: userPreferences?.currency,
        language: userPreferences?.language,
        timezone: userPreferences?.timezone,
        theme: userPreferences?.theme,
    };
    const {
        handleSubmit,
        control,
        reset,
        register,
        formState: { errors },
    } = useForm<UserPreferencesForm>({
        defaultValues: defaultFormData,
    });
    const [disabled, setDisabled] = React.useState(true);

    const handleCancelEdit = () => {
        setDisabled(true);
        reset(defaultFormData);
    };

    const onSubmit = async (data: any) => {
        const res = await fetch('/api/user-preferences/update', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await res.json();
        setDisabled(true);
        reset(json);
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
                        {`${userPreferences ? 'Update' : 'Create'}`} {title}
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <StructuredGrid spacing={2}>
                            <Controller
                                name="splittingUserId"
                                control={control}
                                defaultValue={defaultFormData.splittingUserId}
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
                                defaultValue={defaultFormData.currency}
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
                                defaultValue={defaultFormData.language}
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
                                defaultValue={defaultFormData.timezone}
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
                                            defaultValue={
                                                defaultFormData.timezone
                                            }
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
                                defaultValue={defaultFormData.theme}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <>
                                        <InputLabel>Theme</InputLabel>
                                        <RadioGroup
                                            {...field}
                                            defaultValue={defaultFormData.theme}
                                        >
                                            <FormControlLabel
                                                value="dark"
                                                label="Dark"
                                                control={<Radio />}
                                                disabled={disabled}
                                            />
                                            <FormControlLabel
                                                value="light"
                                                label="Light"
                                                control={<Radio />}
                                                disabled={disabled}
                                            />
                                        </RadioGroup>
                                    </>
                                )}
                            />
                            <Controller
                                name="preferredSort"
                                control={control}
                                defaultValue={''}
                                render={({ field }) => (
                                    <>
                                        <InputLabel>Filtered List</InputLabel>
                                        <input
                                            {...field}
                                            type="file"
                                            value={field.value}
                                            name="filteredList"
                                            onChange={(e) => {
                                                field.onChange(
                                                    e.target.files?.[0]
                                                );
                                            }}
                                        />
                                    </>
                                )}
                            />
                        </StructuredGrid>

                        <Box sx={{ flexGrow: 1 }} m={2}>
                            {disabled ? (
                                <Button
                                    variant="outlined"
                                    sx={{ alignItems: 'center' }}
                                    onClick={() => setDisabled(!disabled)}
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        alignItems="center"
                                    >
                                        <Grid item>Edit Preferences</Grid>
                                        <Grid item>
                                            <Lock />
                                        </Grid>
                                    </Grid>
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
                <Card sx={{ p: 2, mt: 2 }}>
                    <Typography sx={{ color: 'primary.light', p: 2 }}>
                        Banks
                    </Typography>
                    <Box>
                        {banks.map((bank) => (
                            <div key={bank.id}>{bank.name}</div>
                        ))}
                    </Box>
                </Card>
            </Container>
        </div>
    );
}

export default UserPreferences;
