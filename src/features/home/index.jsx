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
} from "@chakra-ui/core";
import Moment from "react-moment";
import Axios from "axios";
import JobDrawer from "../../components/job-drawer";
import { URL } from "../../utils/url";
import JobItem from "../../components/job-item";
import Link from "next/link";
import theme from "../../theme.js";

function HomeComponent() {
  const [jobs, setJobs] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tweetJobs, setTweetJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState({});
  useEffect(() => {
    Axios.get(URL + "/api/v1/jobs")
      .then((result) => {
        setJobs(result.data.results);
      })
      .catch((error) => {
        console.log(error.response);
      });
    Axios.get(URL + "/api/v1/tweetjobs")
      .then((result) => {
        setTweetJobs(result.data.results);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const openDrawer = (job) => {
    setSelectedJob(job);
    onOpen();
  };
  const { colors } = theme;
  const colorValues = [
    "#d5cbe0",
    colors.gray[200],
    "#96d0c8",
    "#87ccd8",
    colors.primary[200],
  ];
  // console.log(c);
  return (
    <>
      <Box>
        <Stack pl={["5%", "8%"]}>
          <Text style={{ marginBottom: "-4px" }} color="gray.600" fontSize="lg">
            Hello Klein,
          </Text>
          <Heading my={0} fontWeight="extrabold" fontSize={["4xl", "5xl"]}>
            Your Jobs
          </Heading>
          <Text fontWeight="bold" mt={2} fontSize="lg">
            Saved Jobs
          </Text>
          <div className="">
            <Flex
              pt={1}
              style={{ flexFlow: "nowrap" }}
              overflowX="scroll"
              overflowY="hidden"
              display="flex"
              // bg="blue.300"
              height={[240, 290]}
              className="savedJobsRow"
              ml={["-6%", "-9%"]}
              px={["6%", "9%"]}
            >
              {jobs.slice(0, 7).map((job) => (
                <Box
                  minW={[235, 240]}
                  mr="16px"
                  display="block"
                  key={job.id}
                  p={4}
                  pt={4}
                  bg={
                    colorValues[
                      Math.floor(Math.random(0, 4) * colorValues.length)
                    ]
                  }
                  cursor="pointer"
                  wordBreak="break-word"
                  transition=".7s all"
                  onClick={() => openDrawer(job)}
                  border="2px solid"
                  borderColor={`gray.50`}
                  borderRadius={16}
                  height={[220, 260]}
                  // backgroundColor="white"
                >
                  <Text
                    height={[45, 85]}
                    mb={70}
                    transition=".6s all"
                    fontSize={["xl", "2xl"]}
                  >
                    {job.likelyJobNames.replace(/(.{48})..+/, "$1…")}
                  </Text>
                  <Flex justify="space-between">
                    <Badge
                      variant="subtle"
                      variantColor="green"
                      px={3}
                      py={1}
                      mb={4}
                      style={{
                        visibility:
                          job.isRemote == "true" ? "visible" : "hidden",
                      }}
                    >
                      Remote
                    </Badge>
                  </Flex>
                  <Flex justify="space-between">
                    <Flex>
                      <Avatar
                        name={job.author}
                        position="inherit"
                        width={8}
                        height={8}
                        src={job.imageUrl}
                      />

                      <Text pt={1} ml={2}>
                        {job.author}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              ))}
              <Box pr={["5%", "9%"]}></Box>
            </Flex>
          </div>

          <Text fontWeight="bold" pt={8} pb={2} fontSize="lg">
            Recently Added
          </Text>

          <Box pr={["5%", "8%"]}>
            <Stack spacing={4}>
              {jobs.slice(0, 7).map((job, index) => (
                <JobItem key={index} job={job} />
              ))}
              <Text fontWeight="bold" textAlign="center">
                <Link href="/jobs">
                  <a>View All</a>
                </Link>
              </Text>
            </Stack>
          </Box>
          {
            // <Text fontWeight="bold" mt={8} fontSize="lg">
            //   Other Job Tweets
            // </Text>
            // <div className="savedJobsRow">
            //   <Flex
            //     style={{ flexFlow: "nowrap" }}
            //     overflowX="scroll"
            //     overflowY="hidden"
            //     display="flex"
            //     className="savedJobsRow"
            //     ml="-7%"
            //     px="7%"
            //     pt={1}
            //   >
            //     {tweetJobs.slice(0, 7).map((tweet) => (
            //       <Box
            //         minW={[200, 240]}
            //         mr="16px"
            //         key={tweet.id}
            //         display="block"
            //         wordBreak="break-word"
            //         p={4}
            //         cursor="pointer"
            //         onClick={() => openDrawer(tweet)}
            //         border="2px solid"
            //         borderColor="gray.50"
            //         borderRadius={16}
            //         height={[180, 220]}
            //         backgroundColor="white"
            //       >
            //         <Text height={[50, 80]} mb={70} fontSize={["sm", "lg"]}>
            //           {tweet.cleanedTweet.replace(/(.{88})..+/, "$1…")}
            //         </Text>
            //         <Flex justify="space-between">
            //           <Flex width="70%">
            //             <Avatar
            //               name={tweet.author}
            //               position="inherit"
            //               width={6}
            //               height={6}
            //               src={tweet.profile_image_url}
            //             />
            //             <Text isTruncated ml={2}>
            //               {tweet.author}
            //             </Text>
            //           </Flex>
            //           <Box>
            //             <Moment
            //               //  fromNow
            //               format="hh:mm"
            //               ago={[true, false]}
            //             >
            //               {tweet.tweetDate}
            //             </Moment>
            //           </Box>
            //         </Flex>
            //       </Box>
            //     ))}
            //     <Box pr={["5%", "8%"]}></Box>
            //   </Flex>
            // </div>
            // <Box mt={4} pr={["5%", "8%"]}>
            //   <Stack spacing={3}>
            //     {tweetJobs.slice(8, 13).map((tweet) => (
            //       <Box
            //         key={tweet.id}
            //         p={4}
            //         backgroundColor="white"
            //         shadow="none"
            //         onClick={() => openDrawer(tweet)}
            //         cursor="pointer"
            //         borderRadius={12}
            //       >
            //         <Flex justify="space-between">
            //           <Flex w="calc(100vw - 210px)">
            //             <Avatar
            //               src={tweet.profile_image_url}
            //               width={10}
            //               height={10}
            //               position="inherit"
            //               name={tweet.author}
            //               mr="16px"
            //               rounded={10}
            //               alt="sender-image"
            //             ></Avatar>
            //             <Box
            //               w={[
            //                 "calc(100vw - 210px)",
            //                 "calc(100vw - 210px)",
            //                 "calc(100vw - 352px)",
            //               ]}
            //             >
            //               <Text isTruncated fontSize="md">
            //                 {tweet.cleanedTweet}
            //               </Text>
            //               <Text color="gray.500" fontSize="sm" isTruncated>
            //                 by {tweet.author}
            //               </Text>
            //             </Box>
            //           </Flex>
            //           <Box pt={2}>
            //             <Text fontSize="sm" isTruncated>
            //               <Moment fromNow ago={[true, false]}>
            //                 {tweet.tweetDate}
            //               </Moment>
            //             </Text>
            //           </Box>
            //         </Flex>
            //       </Box>
            //     ))}
            //   </Stack>
            // </Box>
          }
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
export default React.memo(HomeComponent);
