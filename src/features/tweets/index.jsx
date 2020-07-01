import React, { useState, useEffect } from "react";
import { Text, Stack, Box, Heading, Spinner } from "@chakra-ui/core";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { URL } from "../../utils/url";
import JobTweetItem from "../../components/job-tweet-item";

export default function TweetsComponent() {
  const [jobTweets, setJobTweets] = useState([]);
  const [nextEndpoint, setNextEndpoint] = useState("");
  const [hasMore, setHasMore] = useState(true);
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
          fontSize={["xl", "3xl"]}
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
                {jobTweets.map((tweet, index) => (
                  <JobTweetItem key={index} tweet={tweet} />
                ))}
              </InfiniteScroll>
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
