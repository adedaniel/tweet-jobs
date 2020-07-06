import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import Head from "next/head";
import "../../style.css";

import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Catamaran&family=Raleway&display=swap"
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
        .savedJobsRow::-webkit-scrollbar,
        .savedJobsRow::-moz-scrollbar {
          width: 0px !important;
          height: 0px !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          background-color: transparent;
          border-radius: 16px;
          -ms-overflow-style: none; /* IE 11 */
          scrollbar-width: none;
        }

        .savedJobsRow::-webkit-scrollbar-thumb,
        .savedJobsRow::-moz-scrollbar-thumb {
          background: rgb(226, 230, 226);
          border-radius: 16px;
        }

        .savedJobsRow::-webkit-scrollbar-thumb:hover,
        .savedJobsRow::-moz-scrollbar-thumb:hover {
          background: gray;
        }
      `}</style>
    </>
  );
}

export default MyApp;
