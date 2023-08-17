import React from 'react';
import {
  Container, Typography, Paper, Box, List, ListItem, ListItemText, Divider, ListItemAvatar, Avatar
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LinkIcon from '@mui/icons-material/Link';
import LockIcon from '@mui/icons-material/Lock';

function ThreatIndicatorsPage() {
    return (
        <Container style={{ marginTop: '40px' }}>
            <Typography variant="h4" gutterBottom>
                Threat Indicators: Phishing Awareness
            </Typography>

            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h6" color="error" gutterBottom>
                    <WarningIcon style={{ marginRight: '10px', verticalAlign: 'middle' }} />
                    What is Phishing?
                </Typography>
                <Typography variant="body1" paragraph>
                    Phishing is a type of cyberattack where malicious actors try to trick you into sharing sensitive information. They do this by pretending to be someone you trust, like a bank, a colleague, or a service provider.
                </Typography>

                <Box marginTop={3} marginBottom={2}>
                    <Typography variant="h6">Common Phishing Indicators:</Typography>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar><MailOutlineIcon /></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Suspicious Emails" secondary="Look out for unexpected emails, especially those that ask for sensitive information or ask you to click on a strange link." />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar><LinkIcon /></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Misleading Domains" secondary="Attackers often use URLs that look similar to legitimate ones. Always check the URL before entering personal information." />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar><LockIcon /></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Insecure Websites" secondary="Always ensure the website you're on has 'https://' in the URL and a padlock icon, indicating it's secure." />
                        </ListItem>
                    </List>
                </Box>

                <Box marginTop={3}>
                    <Typography variant="h6">Tips to Stay Safe:</Typography>
                    <Typography variant="body1" paragraph>
                        1. Always verify the sender's email if something seems off.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        2. Never click on links or download attachments from unknown sources.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        3. Use strong, unique passwords for each of your accounts.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        4. Enable two-factor authentication wherever possible.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        5. Keep your software and devices updated.
                    </Typography>
                </Box>
            </Paper>

        </Container>
    );
}

export default ThreatIndicatorsPage;
