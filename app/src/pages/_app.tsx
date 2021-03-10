import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { createClient, Provider } from "urql";

import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  const client = createClient({
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include",
    },
  });

  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
