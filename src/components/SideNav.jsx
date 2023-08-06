import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import SubjectIcon from '@mui/icons-material/Subject';
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
                {!collapsed ? <Typography variant='body2' sx={styles.yourChannel}>Your Channel</Typography> : null}
                {!collapsed ? <Typography variant='overline'>Derp</Typography> : null}
            </Box>
            <Menu menuItemStyles={{
                button: ({active}) => {
                    return {
                        backgroundColor: active? theme.palette.neutral.medium : undefined
                    }
                },
            }}>
                <MenuItem active={location.pathname == '/'} component={<Link to="/" />} icon={<AttachEmailIcon />}>
                    <Typography variant='body2'>Dashboard</Typography>
                </MenuItem>
                <MenuItem active={location.pathname == '/analytics'} component={<Link to="/analytics" />} icon={<CancelScheduleSendIcon />}>
                    <Typography variant='body2'>Analytics</Typography>
                </MenuItem>
                <MenuItem active={location.pathname == '/contents'} component={<Link to="/contents" />} icon={<SubjectIcon />}>
                    <Typography variant='body2'>Contents</Typography>
                </MenuItem>
                <MenuItem active={location.pathname == '/customisation'} component={<Link to="/customisation" />} icon={<AcUnitIcon />}>
                    <Typography variant='body2'>Customisation</Typography>
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