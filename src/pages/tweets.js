import React from "react";
import Appbar from "../components/appbar";
import TweetsComponent from "../features/tweets";
import Head from "next/head";
import { Box } from "@chakra-ui/core";

function Tweets() {
  return (
    <>
      <Head>
        <title>See Jobs - Job Tweets</title>
      </Head>
      <Box backgroundColor="gray.50" pb={10}>
        <Appbar />
        <TweetsComponent />
      </Box>
    </>
  );
}

export default Tweets;
