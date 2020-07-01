import React from "react";
import Appbar from "../components/appbar";
import HomeComponent from "../features/home";
import Head from "next/head";
import { Box } from "@chakra-ui/core";

function Index() {
  return (
    <>
      <Head>
        <title>See Jobs - Home</title>
      </Head>
      <Box backgroundColor="gray.100" pb={10}>
        <Appbar />
        <HomeComponent />
      </Box>
    </>
  );
}

export default Index;
