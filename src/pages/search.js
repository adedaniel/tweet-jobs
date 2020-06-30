import React from "react";
import Appbar from "../components/appbar";
import SearchComponent from "../features/search";
import Head from "next/head";
import { Box } from "@chakra-ui/core";

function Search() {
  return (
    <>
      <Head>
        <title>See Jobs | Search</title>
      </Head>
      <Box backgroundColor="gray.50" pb={10}>
        <Appbar />
        <SearchComponent />
      </Box>
    </>
  );
}

export default Search;
