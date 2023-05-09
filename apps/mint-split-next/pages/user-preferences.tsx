import { CheckBox, RadioButtonChecked } from '@mui/icons-material';
import {
    Box,
    Button,
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
} from '@mui/material';
import React from 'react';
import { ReactElement } from 'react';

export async function getServerSideProps() {
    return {
        props: {
            title: 'User Preferences',
        },
    };
}

function UserPreferences({ title }: { title: any }): ReactElement {
    const [disabled, setDisabled] = React.useState(true);

    return (
        <div>
            <div>Update {title}</div>
            <Container maxWidth="sm">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>Default Shared User</InputLabel>
                            <Select label="Default Shared User">
                                <MenuItem value="user1">User 1</MenuItem>
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
                                <option value="en">English</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <FormLabel>Default Timezone</FormLabel>
                            <Select>
                                <option value="America/Chicago">
                                    America/Chicago
                                </option>
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
                                onClick={() => setDisabled(!disabled)}
                            >
                                Save
                            </Button>
                        </>
                    )}
                </Box>
            </Container>
        </div>
    );
}

export default UserPreferences;
