import React from 'react';
import {
  Container, Typography, Paper, Button, List, ListItem,
  ListItemText, Divider, Grid, Box
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import BarChartIcon from '@mui/icons-material/BarChart';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import SecurityIcon from '@mui/icons-material/Security';

function ReportsPage() {
    return (
        <Container style={{ marginTop: '40px' }}>
            <Typography variant="h4" gutterBottom>
                Cybersecurity Reports
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Box display="flex" alignItems="center" marginBottom="20px">
                            <ReportProblemIcon color="error" style={{ marginRight: '10px' }} />
                            <Typography variant="h6">Phishing Attempts</Typography>
                        </Box>
                        <Typography variant="body1">Total attempts: 342</Typography>
                        <Typography variant="body1">Blocked attempts: 300</Typography>
                        <Typography variant="body1">Successful breaches: 42</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Box display="flex" alignItems="center" marginBottom="20px">
                            <SecurityIcon color="primary" style={{ marginRight: '10px' }} />
                            <Typography variant="h6">Security Breaches</Typography>
                        </Box>
                        <Typography variant="body1">Total breaches: 50</Typography>
                        <Typography variant="body1">Data compromised: 12 instances</Typography>
                        <Typography variant="body1">Data leaks prevented: 38</Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Button variant="contained" color="primary" style={{ marginBottom: '20px' }}>
                    Generate Detailed Report
                </Button>
                <Typography variant="h6" gutterBottom>
                    Available Reports
                </Typography>
                <List>
                    <ListItem button>
                        <ListItemText primary="Phishing Analysis - January 2023" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Security Breach Review - December 2022" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Overall Security Assessment - 2022" />
                    </ListItem>
                </List>
            </Paper>

        </Container>
    );
}

export default ReportsPage;
