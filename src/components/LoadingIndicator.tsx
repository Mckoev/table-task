import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";

function LoadingIndicator() {
    return (
        <Box sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <CircularProgress size={300} thickness={1}/>
        </Box>
    );
};

export default LoadingIndicator;