import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { Box, Typography, Button } from "@mui/material";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <Box p={1} px={2} bgcolor="white" borderRadius={1} boxShadow={1}>
      {/* {ensAvatar && (
        <img
          alt="ENS Avatar"
          src={ensAvatar}
          style={{ borderRadius: "50%", width: "40px", height: "40px" }}
        />
      )} */}
      {address && (
        <Box display="flex" justifyContent="center">
          <Typography variant="body1" color="black">
            {ensName
              ? `${ensName} (${formatAddress(address)})`
              : formatAddress(address)}
          </Typography>
        </Box>
      )}
      <Button onClick={() => disconnect()} style={{ color: "black" }}>
        Disconnect
      </Button>
    </Box>
  );
}
