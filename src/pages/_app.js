import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import Head from "next/head";
import "../../style.css";

import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&family=Raleway&display=swap"
          rel="stylesheet"
        ></link>
        <title>See Jobs</title>
      </Head>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
      <style jsx global>{`
        body {
          color: black;
        }
      `}</style>
    </>
  );
}

export default MyApp;
