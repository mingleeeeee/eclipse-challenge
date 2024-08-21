import * as React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[800],
  color: "white",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  "&:hover": {
    backgroundColor: theme.palette.grey[700],
    color: "white",
  },
}));

export default function Navbar() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        bgcolor: grey[800],
        color: "white",
      }}
    >
      <Box sx={{ p: 4, width: "100%" }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Pages
        </Typography>
        <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
          <Box component="li">
            <StyledButton as={Link} href="/">
              Home
            </StyledButton>
          </Box>

          <Box component="li">
            <StyledButton as={Link} href="/test" fullWidth>
              Test
            </StyledButton>
          </Box>

          <Box component="li">
            <StyledButton as={Link} href="/user" fullWidth>
              User
            </StyledButton>
          </Box>

          <Box component="li">
            <StyledButton as={Link} href="/publish" fullWidth>
              Publish
            </StyledButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
