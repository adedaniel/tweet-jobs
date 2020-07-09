import React from "react";
import Appbar from "../components/appbar";
import HomeComponent from "../features/home";
import Head from "next/head";
import { Box } from "@chakra-ui/core";

function Index() {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <title>See Jobs - Home</title>
      </Head>
      <Box backgroundColor="gray.50" pb={10}>
        <Appbar />
        <HomeComponent />
      </Box>
    </>
  );
}

export default Index;
