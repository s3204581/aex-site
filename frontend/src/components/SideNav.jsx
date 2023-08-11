import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import { Search } from '@mui/icons-material';
import WarningIcon from '@mui/icons-material/Warning';
import SettingsIcon from '@mui/icons-material/Settings';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Avatar, Box, Typography } from '@mui/material';
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function SideNav() {
    const theme = useTheme();
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <Sidebar collapsed={collapsed}
            style={{
                height: '100%',
                top: 'auto'
            }}
            breakPoint='md'
            backgroundColor={theme.palette.neutral.light}>
            <Box sx={styles.avatarContainer}>
                <Avatar sx={styles.avatar} alt='Channel Name' src="src/assets/sample-logo.png"
                    onClick={() => setCollapsed(!collapsed)}
                />
                {!collapsed ? <Typography variant='body2' sx={styles.yourChannel}>PhishNet</Typography> : null}
                {!collapsed ? <Typography variant='overline'>username</Typography> : null}
            </Box>
            <Menu menuItemStyles={{
                button: ({active}) => {
                    return {
                        backgroundColor: active? theme.palette.neutral.medium : undefined
                    }
                },
            }}>
                <MenuItem active={location.pathname == '/'} component={<Link to="/" />} icon={<DescriptionIcon />}>
                    <Typography variant='body2'>Reports</Typography>
                </MenuItem>
                <MenuItem active={location.pathname == '/scan'} component={<Link to="/scan" />} icon={<Search />}>
                    <Typography variant='body2'>Scan</Typography>
                </MenuItem>
                <MenuItem active={location.pathname == '/contents'} component={<Link to="/threats" />} icon={<WarningIcon />}>
                    <Typography variant='body2'>Threat Indicators</Typography>
                </MenuItem>
                <MenuItem active={location.pathname == '/dashboard'} component={<Link to="/dashboard" />} icon={<AccountCircleIcon />}>
                    <Typography variant='body2'>Users</Typography>
                </MenuItem>
                <MenuItem active={location.pathname == '/settings'} component={<Link to="/settings" />} icon={<SettingsIcon />}>
                    <Typography variant='body2'>Settings</Typography>
                </MenuItem>

            </Menu>
        </Sidebar>
    );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
    avatarContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        my: 5
    },
    avatar: {
        width: '40%',
        height: 'auto'
    },
    yourChannel: {
        mt: 1
    }
}

export default SideNav;