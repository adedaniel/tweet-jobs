import React from "react";
import Appbar from "../components/appbar";
import JobsComponent from "../features/jobs";
import Head from "next/head";
import { Box } from "@chakra-ui/core";

function Jobs() {
  return (
    <>
      <Head>
        <title>See Jobs | All Jobs</title>
      </Head>
      <Box backgroundColor="gray.50" pb={10}>
        <Appbar />
        <JobsComponent />
      </Box>
    </>
  );
}

export default Jobs;
