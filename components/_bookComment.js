import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";

export default function _bookComment({ text, user, createdDate }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Divider flexItem orientation="horizontal" />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            justifyContent: "space-between",
            margin: 1,
          }}
        >
          <Typography variant="subtitle1" gutterBottom component="div">
            {user.userName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {new Date(createdDate).toLocaleString()}
          </Typography>
        </Box>
        <Typography variant="body1" gutterBottom>
          {text}
        </Typography>
      </Box>
    </Box>
  );
}
