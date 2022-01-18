import "@fontsource/inter";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles";
function MyApp({ Component, pageProps }: AppProps) {
  // Default project setup for Next.js apps
  return (
    // Using chakra ui, an awesome css-in-js component library
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
