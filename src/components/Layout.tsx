import Navbar from "./Navbar";
import { ReactNode, useEffect, useState } from "react";
import ConnectWallet from "./wallet/ConnectWallet";
import Box from "@mui/material/Box";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box display="flex" minHeight="100vh">
      <Box width="20%" position="fixed" height="100%">
        <Navbar />
      </Box>

      <Box width="80%" marginLeft="20%">
        {isClient && (
          <Box position="absolute" top={0} right={0} p={2}>
            <ConnectWallet />
          </Box>
        )}
        {children}
      </Box>
    </Box>
  );
}
