import Layout from "@/components/Layout";
import { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";
import { config } from "@/config";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  // const router = useRouter();
  // const { publicRuntimeConfig } = getConfig();
  // const [messages, setMessages] = useState(pageProps.messages);
  // const [loading, setLoading] = useState(!pageProps.messages);

  // useEffect(() => {
  //   const loadMessages = async () => {
  //     const locale = router.locale || "jp";
  //     setMessages(messages.default);
  //     setLoading(false);
  //   };

  //   if (!pageProps.messages) {
  //     loadMessages();
  //   }
  // }, [router.locale, pageProps.messages]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
