import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import PhishingIcon from '@mui/icons-material/Phishing';
import Face2Icon from '@mui/icons-material/Face2';

function AppHeader() {
    
    return (
        <AppBar position="sticky" sx={styles.appBar}>
            <Toolbar>
                <IconButton color="secondary">
                    <PhishingIcon />
                </IconButton>
                <Box
                    component='img'
                    sx={styles.appLogo}
                    src='/src/assets/thumbnail.png' />
                <Box
                    component='img'
                    sx={styles.appLogo}
                    src='/src/assets/study-icon.png' />
                <Box sx={{ flexGrow: 1 }} />
                <Box
                    component='img'
                    sx={styles.appLogo}
                    src='/src/assets/study-icon2.png' />
                <Box
                    component='img'
                    sx={styles.appLogo}
                    src='/src/assets/sample-logo.png' />
                <Box
                    component='img'
                    sx={styles.appLogo}
                    src='/src/assets/thumbnail2.png' />
                <IconButton title='Settings' color="secondary">
                    <Face2Icon />
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