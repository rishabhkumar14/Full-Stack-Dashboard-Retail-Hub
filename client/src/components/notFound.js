import React from "react";
import { Box, Typography } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1" color="#363740" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" color="textSecondary" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Oops! The page you are looking for does not exist.
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
