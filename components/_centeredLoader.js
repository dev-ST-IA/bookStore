import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

export default function CenteredLoader({ size = 60, color = "secondary" }) {
  return (
    <Box
      sx={{
        width: 1,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <CircularProgress color={color} size={size} />
    </Box>
  );
}
