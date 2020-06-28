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

export default function TweetsComponent() {
  const [jobTweets, setJobTweets] = useState([]);
  const [nextEndpoint, setNextEndpoint] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasMore, setHasMore] = useState(true);
  const [selectedJob, setSelectedJob] = useState({});
  useEffect(() => {
    fetchFirstPageJobs();
  }, []);
  const fetchFirstPageJobs = () => {
    Axios.get(URL + "/api/v1/tweetjobs")
      .then((result) => {
        setJobTweets(result.data.results);
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
        setJobTweets(jobTweets.concat(result.data.results));
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
          Job Tweets
        </Heading>

        <Stack pl="6%">
          <Box pr="6%">
            <Stack spacing={4}>
              <InfiniteScroll
                dataLength={jobTweets.length} //This is important field to render the next data
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                  <Box textAlign="center">
                    <Spinner
                      speed="0.40s"
                      emptyColor="gray.200"
                      color="primary"
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
                {jobTweets.map((tweet) => (
                  <Box
                    key={tweet.id}
                    p={4}
                    backgroundColor="white"
                    shadow="none"
                    mb={4}
                    onClick={() => openDrawer(tweet)}
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
                          rounded={10}
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

      <style jsx>{`
        .savedJobsRow::-webkit-scrollbar {
          width: 0px !important;
          height: 0px !important;
          background-color: lightgray;
          border-radius: 16px;
        }

        .savedJobsRow::-webkit-scrollbar-thumb {
          background: rgb(226, 230, 226);
          border-radius: 16px;
        }

        .savedJobsRow::-webkit-scrollbar-thumb:hover {
          background: gray;
        }
      `}</style>
    </>
  );
}
