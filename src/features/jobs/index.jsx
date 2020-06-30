import React, { useState, useEffect } from "react";
import {
  Text,
  Stack,
  Box,
  Flex,
  Heading,
  Badge,
  Avatar,
  useDisclosure,
  Spinner,
} from "@chakra-ui/core";
import Moment from "react-moment";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import JobDrawer from "../../components/job-drawer";
import { URL } from "../../utils/url";

export default function JobsComponent() {
  const [jobs, setJobs] = useState([]);
  const [nextEndpoint, setNextEndpoint] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasMore, setHasMore] = useState(true);
  const [selectedJob, setSelectedJob] = useState({});
  useEffect(() => {
    fetchFirstPageJobs();
  }, []);
  const fetchFirstPageJobs = () => {
    Axios.get(URL + "/api/v1/jobs")
      .then((result) => {
        setJobs(result.data.results);
        setNextEndpoint(result.data.next);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const openDrawer = (job) => {
    setSelectedJob(job);
    onOpen();
  };

  const fetchMoreData = () => {
    if (!nextEndpoint) {
      setHasMore(false);
      return;
    }
    Axios.get(URL + nextEndpoint)
      .then((result) => {
        setJobs(jobs.concat(result.data.results));
        setNextEndpoint(result.data.next);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (
    <>
      <Box>
        <Heading
          textAlign="center"
          fontSize={["2xl", "3xl"]}
          mt="-48px"
          mb="48px"
        >
          Jobs
        </Heading>

        <Stack pl="6%">
          <Box pr="6%">
            <Stack spacing={4}>
              <InfiniteScroll
                dataLength={jobs.length} //This is important field to render the next data
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                  <Box textAlign="center">
                    <Spinner
                      speed="0.40s"
                      emptyColor="gray.300"
                      color="primary.500"
                      size="lg"
                    />
                  </Box>
                }
                endMessage={
                  <Text textAlign="center">
                    <b>That's all folks!</b>
                  </Text>
                }
                refreshFunction={fetchFirstPageJobs}
                pullDownToRefresh
                pullDownToRefreshContent={
                  <Text textAlign="center" fontSize="sm" pb={8}>
                    &#8595; Pull down to refresh
                  </Text>
                }
                releaseToRefreshContent={
                  <Text textAlign="center" fontSize="sm" pb={8}>
                    &#8593; Release to refresh
                  </Text>
                }
                pullDownToRefreshThreshold={50}
              >
                {jobs.map((job, index) => (
                  <Box
                    key={index}
                    shadow="none"
                    onClick={() => openDrawer(job)}
                    cursor="pointer"
                    mb={4}
                  >
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

                        // w="calc(100vw - 210px)"
                      >
                        <Box
                          w={[
                            "calc(100vw - 210px)",
                            "calc(100vw - 210px)",
                            "initial",
                          ]}
                        >
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
                ))}
              </InfiniteScroll>
            </Stack>
          </Box>
        </Stack>
        <JobDrawer
          isOpen={isOpen}
          selectedJob={selectedJob}
          onClose={onClose}
        />

        <br />
        <br />
        <br />
      </Box>
    </>
  );
}
