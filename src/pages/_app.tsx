import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { GetSiweMessageOptions } from "@rainbow-me/rainbowkit-siwe-next-auth/dist/RainbowKitSiweNextAuthProvider";
import "@rainbow-me/rainbowkit/styles.css";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import "../../styles/globals.css";
import theme from "../theme";

// setting up chains + connectors
const { chains, provider } = configureChains(
  [chain.goerli],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID })]
);

const { connectors } = getDefaultWallets({
  appName: "Canggu Vone",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

//sign in message
const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to Canggu Vone",
});

const { ToastContainer, toast } = createStandaloneToast();

export const globalToast = toast;

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <SessionProvider refetchInterval={0} session={session}>
        <RainbowKitSiweNextAuthProvider
          getSiweMessageOptions={getSiweMessageOptions}
        >
          <RainbowKitProvider chains={chains}>
            <ChakraProvider theme={theme}>
              <Component {...pageProps} />
              <ToastContainer />
            </ChakraProvider>
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
