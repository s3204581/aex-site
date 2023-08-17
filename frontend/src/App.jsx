import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material"
import React from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import theme from "./config/theme";
import AppRoutes from "./router/AppRoutes";
import SideNav from './components/SideNav';
import AppHeader from './components/AppHeader';
import { BrowserRouter } from "react-router-dom";


function App() {

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppHeader />
        <Box sx={styles.container}>
          <BrowserRouter>
            <SideNav />
            <Box component={'main'} sx={styles.mainSection}>
              <AppRoutes />
            </Box>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  )
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  container: {
    display: 'flex',
    bgcolor: 'neutral.light',
    height: 'calc(100% - 64px)'
  },
  mainSection: {
    p: 1,
    width: '100%',
    height: '100%',
    overflow: 'auto'
  }
}


export default App