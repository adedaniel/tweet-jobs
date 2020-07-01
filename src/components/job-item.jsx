import React from "react";
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/core";
import Moment from "react-moment";
import JobDrawer from "./job-drawer";

export default function JobItem({ job }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box shadow="none" onClick={onOpen} cursor="pointer" mb={4}>
        <Flex>
          <Avatar
            src={job.imageUrl}
            width={10}
            height={10}
            position="inherit"
            name={job.author}
            mr={4}
            mt={4}
            rounded={10}
            alt="sender-image"
          ></Avatar>
          <Flex
            justify="space-between"
            p={4}
            w="100%"
            shadow="none"
            backgroundColor="white"
            borderRadius={12}
          >
            <Box w={["calc(100vw - 210px)", "calc(100vw - 210px)", "initial"]}>
              <Heading isTruncated fontSize="lg">
                {job.likelyJobNames.replace(/(.{58})..+/, "$1…")}
              </Heading>

              <Text color="gray.500" fontSize="sm" isTruncated>
                by {job.author}
              </Text>
            </Box>

            <Box pt={2}>
              <Text fontSize="sm" isTruncated>
                {job.tweetDate && (
                  <Moment fromNow ago={[true, false]}>
                    {job.tweetDate}
                  </Moment>
                )}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>

      <JobDrawer isOpen={isOpen} selectedJob={job} onClose={onClose} />
    </>
  );
}
