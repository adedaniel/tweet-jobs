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
import Slider from "react-slick";
import Link from "next/link";
export default function HomeComponent() {
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    centerMode: true,
    centerPadding: "6%",
    swipeToSlide: true,
    focusOnSelect: true,
    adaptiveHeight: true,
    slidesToScroll: 1,
    arrows: false,
    className: "center",
  };
  return (
    <>
      <Box>
        <Stack pl="6%">
          <Text style={{ marginBottom: "-4px" }} color="gray.600" fontSize="lg">
            Hello Klein,
          </Text>
          <Heading my={0} fontWeight="extrabold" fontSize={["4xl", "5xl"]}>
            Your Jobs
          </Heading>
          <Text fontWeight="bold" mt={2} fontSize="lg">
            Saved Jobs
          </Text>
          <div className="savedJobsRow">
            <Slider {...settings}>
              {jobs.slice(0, 7).map((job) => (
                <Box
                  minW={[235, 240]}
                  mr="16px"
                  display="block"
                  key={job.id}
                  p={4}
                  pt={4}
                  cursor="pointer"
                  wordBreak="break-word"
                  transition=".7s all"
                  onClick={() => openDrawer(job)}
                  border="2px solid"
                  borderColor={`gray.50`}
                  borderRadius={16}
                  height={[220, 260]}
                  backgroundColor="white"
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
            </Slider>
            {
              // <Flex
              //       pt={1}
              //       style={{ flexFlow: "nowrap" }}
              //       overflowX="scroll"
              //       overflowY="hidden"
              //       display="flex"
              //       height={[240, 290]}
              //       className="savedJobsRow"
              //       ml="-7%"
              //       px="7%"
              //     >
              //       {jobs.slice(0, 7).map((job) => (
              //         <Box
              //           minW={[235, 240]}
              //           mr="16px"
              //           display="block"
              //           key={job.id}
              //           p={4}
              //           pt={4}
              //           cursor="pointer"
              //           wordBreak="break-word"
              //           transition=".7s all"
              //           onClick={() => openDrawer(job)}
              //           border="2px solid"
              //           borderColor={`gray.50`}
              //           borderRadius={16}
              //           height={[220, 260]}
              //           backgroundColor="white"
              //         >
              //           <Text
              //             height={[45, 85]}
              //             mb={70}
              //             transition=".6s all"
              //             fontSize={["xl", "2xl"]}
              //           >
              //             {job.likelyJobNames.replace(/(.{48})..+/, "$1…")}
              //           </Text>
              //           <Flex justify="space-between">
              //             <Badge
              //               variant="subtle"
              //               variantColor="green"
              //               px={3}
              //               py={1}
              //               mb={4}
              //               style={{
              //                 visibility:
              //                   job.isRemote == "true" ? "visible" : "hidden",
              //               }}
              //             >
              //               Remote
              //             </Badge>
              //           </Flex>
              //           <Flex justify="space-between">
              //             <Flex>
              //               <Avatar
              //                 name={job.author}
              //                 position="inherit"
              //                 width={8}
              //                 height={8}
              //                 src={job.imageUrl}
              //               />
              //               <Text pt={1} ml={2}>
              //                 {job.author}
              //               </Text>
              //             </Flex>
              //           </Flex>
              //         </Box>
              //       ))}
              //       <Box pr="6%"></Box>
              //     </Flex>
            }
          </div>

          <Text fontWeight="bold" pt={8} pb={2} fontSize="lg">
            Recently Added
          </Text>

          <Box pr="6%">
            <Stack spacing={4}>
              {jobs.slice(0, 4).map((job, index) => (
                <JobItem key={index} job={job} />
              ))}
              <Text fontWeight="bold" textAlign="center">
                <Link href="/jobs">
                  <a>View All</a>
                </Link>
              </Text>
            </Stack>
          </Box>

          <Text fontWeight="bold" mt={8} fontSize="lg">
            Other Job Tweets
          </Text>
          <div className="savedJobsRow">
            <Flex
              style={{ flexFlow: "nowrap" }}
              overflowX="scroll"
              overflowY="hidden"
              display="flex"
              className="savedJobsRow"
              ml="-7%"
              px="7%"
              pt={1}
            >
              {tweetJobs.slice(0, 7).map((tweet) => (
                <Box
                  minW={[200, 240]}
                  mr="16px"
                  key={tweet.id}
                  display="block"
                  wordBreak="break-word"
                  p={4}
                  cursor="pointer"
                  onClick={() => openDrawer(tweet)}
                  border="2px solid"
                  borderColor="gray.50"
                  borderRadius={16}
                  height={[180, 220]}
                  backgroundColor="white"
                >
                  <Text height={[50, 80]} mb={70} fontSize={["sm", "lg"]}>
                    {tweet.cleanedTweet.replace(/(.{88})..+/, "$1…")}
                  </Text>
                  <Flex justify="space-between">
                    <Flex width="70%">
                      <Avatar
                        name={tweet.author}
                        position="inherit"
                        width={6}
                        height={6}
                        src={tweet.profile_image_url}
                      />

                      <Text isTruncated ml={2}>
                        {tweet.author}
                      </Text>
                    </Flex>
                    <Box>
                      <Moment
                        //  fromNow
                        format="hh:mm"
                        ago={[true, false]}
                      >
                        {tweet.tweetDate}
                      </Moment>
                    </Box>
                  </Flex>
                </Box>
              ))}
              <Box pr="6%"></Box>
            </Flex>
          </div>

          <Box mt={4} pr="6%">
            <Stack spacing={3}>
              {tweetJobs.slice(8, 13).map((tweet) => (
                <Box
                  key={tweet.id}
                  p={4}
                  backgroundColor="white"
                  shadow="none"
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
        .savedJobsRow::-webkit-scrollbar,
        .savedJobsRow::-moz-scrollbar {
          width: 0px !important;
          height: 0px !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          background-color: transparent;
          border-radius: 16px;
        }
        .savedJobsRow {
          -webkit-overflow-style: none !important;
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        .savedJobsRow::-webkit-scrollbar-thumb,
        .savedJobsRow::-moz-scrollbar-thumb {
          background: rgb(226, 230, 226);
          border-radius: 16px;
        }

        .savedJobsRow::-webkit-scrollbar-thumb:hover,
        .savedJobsRow::-moz-scrollbar-thumb:hover {
          background: gray;
        }
      `}</style>
    </>
  );
}
