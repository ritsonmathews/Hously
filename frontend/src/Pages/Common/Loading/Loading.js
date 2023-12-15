import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CircularProgress size={30} />
      </Box>
    </div>
  );
};

export default Loading;
