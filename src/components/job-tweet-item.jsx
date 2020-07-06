import React from "react";
import { Box, Flex, Avatar, Text, useDisclosure } from "@chakra-ui/core";
import Moment from "react-moment";
import JobDrawer from "./job-drawer";

export default function JobTweetItem({ tweet }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        p={4}
        backgroundColor="white"
        shadow="none"
        mb={4}
        onClick={onOpen}
        cursor="pointer"
        borderRadius={12}
      >
        <Flex justify="space-between">
          <Flex w="calc(100vw - 210px)">
            <Avatar
              src={tweet.profile_image_url}
              width={10}
              height={10}
              position="inherit"
              name={tweet.author}
              mr="16px"
              alt="sender-image"
            ></Avatar>
            <Box
              w={[
                "calc(100vw - 210px)",
                "calc(100vw - 210px)",
                "calc(100vw - 352px)",
              ]}
            >
              <Text isTruncated fontSize="md">
                {tweet.cleanedTweet}
              </Text>

              <Text color="gray.500" fontSize="sm" isTruncated>
                by {tweet.author}
              </Text>
            </Box>
          </Flex>
          <Box pt={2}>
            <Text fontSize="sm" isTruncated>
              <Moment fromNow ago={[true, false]}>
                {tweet.tweetDate}
              </Moment>
            </Text>
          </Box>
        </Flex>
      </Box>

      <JobDrawer isOpen={isOpen} selectedJob={tweet} onClose={onClose} />
    </>
  );
}
