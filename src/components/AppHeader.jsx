import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import PhishingIcon from '@mui/icons-material/Phishing';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';

function AppHeader() {
    
    return (
        <AppBar position="sticky" sx={styles.appBar}>
            <Toolbar>
                <IconButton color="secondary">
                    <PhishingIcon />
                </IconButton>
                <Box>PhishNet</Box>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton title='Settings' color="secondary">
                    <NightlightRoundIcon />
                </IconButton>
                <IconButton title='Settings' color="secondary">
                    <PersonIcon />
                </IconButton>
                <IconButton title='Settings' color="secondary">
                    <AppSettingsAltIcon />
                </IconButton>
                <IconButton title='Settings' color="secondary">
                    <AdminPanelSettingsIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
    appBar: {
        bgcolor: 'neutral.main'
    },
    appLogo: {
        borderRadius: 2,
        width: 20,
        ml: 2,
        cursor: 'pointer'
    }
}

export default AppHeader;