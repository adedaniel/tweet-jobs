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
        .savedJobsRow::-webkit-scrollbar {
          width: 0px !important;
          height: 0px !important;
          background-color: lightgray;
          border-radius: 16px;
        }

        .savedJobsRow::-webkit-scrollbar-thumb {
          background: rgb(226, 230, 226);
          border-radius: 16px;
        }

        .savedJobsRow::-webkit-scrollbar-thumb:hover {
          background: gray;
        }
      `}</style>
    </>
  );
}

export default MyApp;
