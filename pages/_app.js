import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import "../styles/reset.css";
function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
