import { Box } from "@mui/material";

function ColourText({ color, children }) {
    return (<Box sx={{color}} component='span'>{children}</Box>);
}

export default ColourText;
