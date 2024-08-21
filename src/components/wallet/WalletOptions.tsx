import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import { Connector, useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <Box p={1} px={2} bgcolor="white" borderRadius={1} boxShadow={1}>
      {connectors.map((connector) => (
        <Button key={connector.uid} onClick={() => connect({ connector })}>
          <Typography variant="body1" color="black">
            {connector.name}
          </Typography>
        </Button>
      ))}
    </Box>
  );
}
