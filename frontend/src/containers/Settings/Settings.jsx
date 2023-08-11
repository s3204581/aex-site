import React from 'react';
import {
  Container, Typography, Paper, TextField, Button, Box, Divider, FormControlLabel, Switch
} from '@mui/material';

function SettingsPage() {
    return (
        <Container style={{ marginTop: '40px' }}>
            <Typography variant="h4" gutterBottom>
                Account Settings
            </Typography>

            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h6" gutterBottom>
                    Personal Information
                </Typography>
                <Box marginBottom={3}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Full Name"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email Address"
                        variant="outlined"
                        type="email"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        variant="outlined"
                        type="password"
                    />
                </Box>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="h6" gutterBottom>
                    Preferences
                </Typography>
                <Box marginBottom={3}>
                    <FormControlLabel
                        control={
                            <Switch
                                name="notifications"
                                color="primary"
                            />
                        }
                        label="Enable Email Notifications"
                    />
                </Box>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="h6" gutterBottom>
                    Account Actions
                </Typography>
                <Box>
                    <Button variant="contained" color="secondary">
                        Delete Account
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default SettingsPage;
