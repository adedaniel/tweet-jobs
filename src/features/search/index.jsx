import React, { useState, useEffect } from "react";
import {
  Text,
  Stack,
  Box,
  Heading,
  Spinner,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Select,
  Button,
  RadioButtonGroup,
} from "@chakra-ui/core";
import Axios from "axios";
import { URL } from "../../utils/url";
import JobItem from "../../components/job-item";
import JobTweetItem from "../../components/job-tweet-item";

export default function SearchComponent() {
  const [jobs, setJobs] = useState([]);
  const [jobTweets, setJobTweets] = useState([]);
  const [nextJobsEndpoint, setNextJobsEndpoint] = useState("");
  const [nextTweetsEndpoint, setNextTweetsEndpoint] = useState("");
  const [hasMoreTweets, setHasMoreTweets] = useState(true);
  const [hasMoreJobs, setHasMoreJobs] = useState(true);
  const [isLoadingMoreTweets, setIsLoadingMoreTweets] = useState(false);
  const [isLoadingMoreJobs, setIsLoadingMoreJobs] = useState(false);
  const [tweetsDisplayLimit, setTweetsDisplayLimit] = useState(20);
  const [jobsDisplayLimit, setJobsDisplayLimit] = useState(20);
  const [filterName, setFilterName] = useState("");
  const [toFilterRemote, setToFilterRemote] = useState(false);
  const [timeDifference, setTimeDifference] = useState(0);
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
  const fetchMoreJobsData = () => {
    if (!nextJobsEndpoint) {
      setHasMoreJobs(false);
      return;
    }

    Axios.get(URL + nextJobsEndpoint)
      .then((result) => {
        // console.log(result.data.next);
        // console.log(result.data.results);
        setJobs([...jobs].concat(result.data.results));

        // console.log(jobs);
        nextJobsEndpoint === result.data.next
          ? setNextJobsEndpoint("")
          : setNextJobsEndpoint(result.data.next);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchMoreTweetsData = () => {
    if (!nextTweetsEndpoint) {
      setHasMoreTweets(false);
      return;
    }
    Axios.get(URL + nextTweetsEndpoint)
      .then((result) => {
        // console.log(result.data.next);
        // console.log(result.data.results);
        setJobTweets(jobTweets.concat(result.data.results));
        nextTweetsEndpoint === result.data.next
          ? setNextTweetsEndpoint("")
          : setNextTweetsEndpoint(result.data.next);
      })
      .catch((error) => {
        console.log(error);
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
  console.log(timeDifference);
  jobs.length !== 0 &&
    console.log(
      new Date() - new Date(jobs[1].tweetDate),
      jobs[1].tweetDate,
      new Date(jobs[1].tweetDate)
    );

  const filterTimeDifference = (job) => {
    // To filter the array by time difference
    return (
      new Date() - new Date(job.tweetDate) >= timeDifference

      // new Date().getHours() - new Date(job.tweetDate).getHours()
    );
  };
  useEffect(() => {
    if (jobTweets.length !== 0 && hasMoreTweets) {
      if (
        jobTweets
          .filter(filterSearch)
          // .filter(filterTimeDifference)
          .filter(filterRemote).length < tweetsDisplayLimit
      ) {
        setIsLoadingMoreTweets(true);
        fetchMoreTweetsData();
      } else {
        setIsLoadingMoreTweets(false);
      }
    }
  }, [
    filterName,
    toFilterRemote,
    tweetsDisplayLimit,
    timeDifference,
    nextTweetsEndpoint,
  ]);

  useEffect(() => {
    if (jobs.length !== 0 && hasMoreJobs) {
      if (
        jobs
          .filter(filterSearch)
          .filter(filterTimeDifference)
          .filter(filterRemote).length < jobsDisplayLimit
      ) {
        setIsLoadingMoreJobs(true);
        fetchMoreJobsData();
      } else {
        setIsLoadingMoreJobs(false);
      }
    }
  }, [
    filterName,
    toFilterRemote,
    jobsDisplayLimit,
    timeDifference,
    nextJobsEndpoint,
  ]);

  // console.log(
  //   jobs.filter(filterSearch).filter(filterTimeDifference).filter(filterRemote)
  //     .length,
  //   jobsDisplayLimit
  // );

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

        <Stack pl={["5%", "8%"]}>
          <Box pr={["5%", "8%"]}>
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
                value={timeDifference}
                onChange={(e) => setTimeDifference(e.target.value)}
                placeholder="Choose Time"
              >
                <option value={1 * 3600000}>From 1 hour ago</option>
                <option value={2 * 3600000}>From 2 hours ago</option>
                <option value={3 * 3600000}>From 3 hours ago</option>
                <option value={4 * 3600000}>From 4 hours ago</option>
                <option value={5 * 3600000}>From 5 hours ago</option>
                <option value={6 * 3600000}>From 6 hours ago</option>
                <option value={7 * 3600000}>From 7 hours ago</option>
                <option value={8 * 3600000}>From 8 hours ago</option>
                <option value={9 * 3600000}>From 9 hours ago</option>
                <option value={10 * 3600000}>From 10 hours ago</option>
                <option value={11 * 3600000}>From 11 hours ago</option>
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
                    .filter(filterTimeDifference)
                    .map((job, index) => (
                      <JobItem key={index} job={job} />
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
                    .filter(filterTimeDifference)
                    .map((tweet, index) => (
                      <JobTweetItem key={index} tweet={tweet} />
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

        <br />
        <br />
        <br />
      </Box>
    </>
  );
}
