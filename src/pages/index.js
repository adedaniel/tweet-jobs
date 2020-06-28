import React from "react";
import Appbar from "../components/appbar";
import HomeComponent from "../features/home";
import Head from "next/head";
import { Box } from "@chakra-ui/core";

function Index() {
  return (
    <>
      <Head>See Jobs | Home</Head>
      <Box backgroundColor="gray.50" pb={10}>
        <Appbar />
        <HomeComponent />
      </Box>
    </>
  );
}

export default Index;
