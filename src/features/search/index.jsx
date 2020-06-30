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
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Select,
  Button,
  RadioButtonGroup,
} from "@chakra-ui/core";
import Moment from "react-moment";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterResults from "react-filter-search";
import JobDrawer from "../../components/job-drawer";
import { URL } from "../../utils/url";

export default function SearchComponent() {
  const [jobs, setJobs] = useState([]);
  const [jobTweets, setJobTweets] = useState([]);
  const [nextJobsEndpoint, setNextJobsEndpoint] = useState("");
  const [nextTweetsEndpoint, setNextTweetsEndpoint] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasMoreTweets, setHasMoreTweets] = useState(true);
  const [hasMoreJobs, setHasMoreJobs] = useState(true);
  const [isLoadingMoreTweets, setIsLoadingMoreTweets] = useState(false);
  const [isLoadingMoreJobs, setIsLoadingMoreJobs] = useState(false);
  const [tweetsDisplayLimit, setTweetsDisplayLimit] = useState(20);
  const [jobsDisplayLimit, setJobsDisplayLimit] = useState(20);
  const [selectedJob, setSelectedJob] = useState({});
  const [filterName, setFilterName] = useState("");
  const [toFilterRemote, setToFilterRemote] = useState(false);
  const [showJobResults, setShowJobResults] = useState(true);

  useEffect(() => {
    fetchFirstPageJobs();
  }, []);
  const fetchFirstPageJobs = () => {
    Axios.get(URL + "/api/v1/jobs")
      .then((result) => {
        setJobs(result.data.results);
        setNextJobsEndpoint(result.data.next);
      })
      .catch((error) => {
        console.log(error.response);
      });
    Axios.get(URL + "/api/v1/tweetjobs")
      .then((result) => {
        setJobTweets(result.data.results);
        setNextTweetsEndpoint(result.data.next);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const openDrawer = (job) => {
    setSelectedJob(job);
    onOpen();
  };
  const fetchMoreJobsData = () => {
    if (!nextJobsEndpoint) {
      setHasMoreJobs(false);
      return;
    }

    Axios.get(URL + nextJobsEndpoint)
      .then((result) => {
        setJobs(jobs.concat(result.data.results));
        console.log(result.data.next);
        nextJobsEndpoint === result.data.next
          ? setNextJobsEndpoint("")
          : setNextJobsEndpoint(result.data.next);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const fetchMoreTweetsData = () => {
    if (!nextTweetsEndpoint) {
      setHasMoreTweets(false);
      return;
    }
    Axios.get(URL + nextTweetsEndpoint)
      .then((result) => {
        setJobTweets(jobTweets.concat(result.data.results));
        console.log(result.data.next);
        nextTweetsEndpoint === result.data.next
          ? setNextTweetsEndpoint("")
          : setNextTweetsEndpoint(result.data.next);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const filterSearch = (job) => {
    // To filter the array by filter name
    if (job.likelyJobNames) {
      return (
        job.cleanedTweet.toLowerCase().includes(filterName.toLowerCase()) ||
        job.author.toLowerCase().includes(filterName.toLowerCase()) ||
        job.likelyJobNames.toLowerCase().includes(filterName.toLowerCase())
      );
    } else {
      return (
        job.cleanedTweet.toLowerCase().includes(filterName.toLowerCase()) ||
        job.author.toLowerCase().includes(filterName.toLowerCase())
      );
    }
  };

  const filterRemote = (job) => {
    // To filter the array by type
    if (toFilterRemote) {
      return job.isRemote == "true";
    } else {
      return job;
    }
  };

  useEffect(() => {
    if (jobTweets.length !== 0 && hasMoreTweets) {
      if (
        jobTweets.filter(filterSearch).filter(filterRemote).length <
        tweetsDisplayLimit
      ) {
        setIsLoadingMoreTweets(true);
        fetchMoreTweetsData();
      } else {
        setIsLoadingMoreTweets(false);
      }
    }
  }, [filterName, toFilterRemote, tweetsDisplayLimit, nextTweetsEndpoint]);

  useEffect(() => {
    if (jobs.length !== 0 && hasMoreJobs) {
      if (
        jobs.filter(filterSearch).filter(filterRemote).length < jobsDisplayLimit
      ) {
        setIsLoadingMoreJobs(true);
        fetchMoreJobsData();
      } else {
        setIsLoadingMoreJobs(false);
      }
    }
  }, [filterName, toFilterRemote, jobsDisplayLimit, nextJobsEndpoint]);

  return (
    <>
      <Box>
        <Heading
          textAlign="center"
          fontSize={["xl", "3xl"]}
          mt="-48px"
          mb="48px"
        >
          Search Jobs
        </Heading>

        <Stack pl="6%">
          <Box pr="6%">
            <InputGroup rounded={8} size="lg" mb={3}>
              <Input
                variant="filled"
                rounded={8}
                value={filterName}
                size="lg"
                onChange={(e) => setFilterName(e.target.value)}
                placeholder="Search"
              />
              <InputRightElement
                color="gray.500"
                zIndex="0"
                children={<Icon name="search" />}
              />
            </InputGroup>
            <Stack mb={8} isInline spacing={4}>
              <Select
                zIndex="0 !important"
                variant="filled"
                placeholder="Choose Time"
              >
                <option value="option1">From 1 hour ago</option>
                <option value="option2">From 2 hours ago</option>
                <option value="option3">From 3 hours ago</option>
                <option value="option3">From 4 hours ago</option>
                <option value="option3">From 5 hours ago</option>
                <option value="option3">From 6 hours ago</option>
                <option value="option3">From 7 hours ago</option>
                <option value="option3">From 8 hours ago</option>
                <option value="option3">From 9 hours ago</option>
                <option value="option3">From 10 hours ago</option>
                <option value="option3">From 11 hours ago</option>
              </Select>
              <Button
                w="2xs"
                variantColor={toFilterRemote ? "primary" : "gray"}
                variant="solid"
                onClick={() => setToFilterRemote(!toFilterRemote)}
              >
                Remote
              </Button>
            </Stack>
            <RadioButtonGroup
              defaultValue="rad2"
              onChange={(val) => setShowJobResults(val)}
              isInline
              mb={4}
            >
              <Button
                variantColor={showJobResults ? "primary" : "gray"}
                value={true}
                role="radio"
              >
                Jobs
              </Button>
              <Button
                variantColor={!showJobResults ? "primary" : "gray"}
                value={false}
                role="radio"
              >
                Tweets
              </Button>
            </RadioButtonGroup>

            <Stack spacing={4}>
              {showJobResults ? (
                <>
                  {jobs
                    .filter(filterSearch)
                    .filter(filterRemote)
                    .map((job, index) => (
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
                                {job.likelyJobNames.replace(
                                  /(.{58})..+/,
                                  "$1…"
                                )}
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

                  {hasMoreJobs ? (
                    isLoadingMoreJobs ? (
                      <Box textAlign="center">
                        <Spinner
                          speed="0.40s"
                          emptyColor="gray.300"
                          color="primary.500"
                          size="lg"
                        />
                      </Box>
                    ) : (
                      <Text
                        cursor="pointer"
                        onClick={() =>
                          setJobsDisplayLimit(jobsDisplayLimit + 20)
                        }
                        textAlign="center"
                      >
                        <b>Load More</b>
                      </Text>
                    )
                  ) : (
                    <Text textAlign="center">
                      <b>That's all folks!</b>
                    </Text>
                  )}
                </>
              ) : (
                <>
                  {jobTweets
                    .filter(filterSearch)
                    .filter(filterRemote)
                    .map((tweet, index) => (
                      <Box
                        key={index}
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
                  {hasMoreTweets ? (
                    isLoadingMoreTweets ? (
                      <Box textAlign="center">
                        <Spinner
                          speed="0.40s"
                          emptyColor="gray.300"
                          color="primary.500"
                          size="lg"
                        />
                      </Box>
                    ) : (
                      <Text
                        cursor="pointer"
                        onClick={() =>
                          setTweetsDisplayLimit(tweetsDisplayLimit + 20)
                        }
                        textAlign="center"
                      >
                        <b>Load More</b>
                      </Text>
                    )
                  ) : (
                    <Text textAlign="center">
                      <b>That's all folks!</b>
                    </Text>
                  )}
                </>
              )}
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
