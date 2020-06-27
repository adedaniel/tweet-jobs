import {
  Link as ChakraLink,
  Text,
  Code,
  Icon,
  List,
  ListIcon,
  ListItem,
  Stack,
  Box,
  Flex,
  Image,
  Heading,
  Badge,
  Avatar,
  PseudoBox,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Button,
  IconButton,
  DrawerFooter,
  Link,
} from "@chakra-ui/core";
import Moment from "react-moment";
// import Slider from "react-slick";
import React, { useState, useEffect, useRef } from "react";
import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import Appbar from "../components/appbar";
import Axios from "axios";
import JobDrawer from "../components/job-drawer";

function Index() {
  const [jobs, setJobs] = useState([]);
  const referenceField = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tweetJobs, setTweetJobs] = useState([]);
  const [dragDown, setDragDown] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  // const [rowWidth, setRowWidth] = useState(
  //   typeof document !== "undefined" &&
  //     (1 / 1.7) * document.querySelector("body").clientWidth
  // );
  useEffect(() => {
    Axios.get("https://seejobs.herokuapp.com/api/v1/jobs")
      .then((result) => {
        // console.log(result.data);
        setJobs(result.data.results);
      })
      .catch((error) => {
        // setIsLoading(false);

        console.log(error.response);
      });
    Axios.get("https://seejobs.herokuapp.com/api/v1/tweetjobs")
      .then((result) => {
        // console.log(result.data);
        setTweetJobs(result.data.results);
      })
      .catch((error) => {
        // setIsLoading(false);

        console.log(error.response);
      });
  }, []);

  // let rowWidth;
  // if (typeof document !== "undefined") {
  //   rowWidth =
  //     // 1 /
  //     document.querySelector("body").clientWidth /
  //     (document.querySelector(".savedJobsRow").scrollWidth /
  //       document.querySelector("body").clientWidth) /
  //     0.5;
  // }

  // console.log(rowWidth);
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 5,
  //   centerMode: true,
  //   centerPadding: "6%",
  //   swipeToSlide: true,
  //   focusOnSelect: true,
  //   adaptiveHeight: true,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   className: "center",
  // };
  // const changeSelectedCard = () => {
  //   if (
  //     document.querySelector(".savedJobsRow").scrollLeft &&
  //     document.querySelector(".savedJobsRow").scrollLeft - scrollValue >
  //       rowWidth
  //   ) {
  //     setSelectedCard(selectedCard + 1);
  //     setScrollValue(scrollValue + rowWidth);
  //     // console.log(selectedCard);
  //   } else if (
  //     document.querySelector(".savedJobsRow").scrollLeft &&
  //     scrollValue - document.querySelector(".savedJobsRow").scrollLeft >
  //       rowWidth
  //   ) {
  //     setSelectedCard(selectedCard - 1);
  //     setScrollValue(scrollValue - rowWidth);
  //     // console.log(selectedCard);
  //   }
  //   if (
  //     // document.querySelector(".savedJobsRow").scrollLeft &&
  //     document.querySelector(".savedJobsRow").scrollLeft == 0
  //   ) {
  //     // console.log(document.querySelector(".savedJobsRow").scrollLeft);
  //     setSelectedCard(0);
  //     setScrollValue(0);
  //   }
  // };

  return (
    <Box backgroundColor="gray.50" pb={10}>
      <Appbar />

      <Box>
        <Stack pl="6%">
          <Text style={{ marginBottom: "-4px" }} color="gray.600" fontSize="lg">
            Hello Klein,
          </Text>
          <Heading my={0} fontWeight="extrabold" fontSize={["4xl", "5xl"]}>
            Your Jobs
          </Heading>
          <Text my={1} fontSize="lg">
            Saved Jobs
          </Text>

          <Flex
            pt={1}
            style={{ flexFlow: "nowrap" }}
            overflowX="scroll"
            overflowY="hidden"
            display="flex"
            cursor="pointer"
            height="300px"
            className="savedJobsRow"
            ml="-7%"
            // onScroll={changeSelectedCard}
            px="7%"
          >
            {jobs.slice(0, 7).map((job, index) => (
              <Box
                minW={[235, 240]}
                mr="16px"
                display="block"
                key={job.id}
                p={4}
                pt={4}
                transition=".7s all"
                // className={`${selectedCard === index && "selected"}`}
                border="2px solid"
                borderColor={`gray.50`}
                marginTop={4}
                borderRadius={16}
                height={[240, 290]}
                backgroundColor="white"
              >
                <Text
                  height={[65, 120]}
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
                      visibility: job.isRemote == "true" ? "visible" : "hidden",
                    }}
                  >
                    Remote
                  </Badge>
                  <Text
                    fontWeight="bold"
                    color="gray.700"
                    fontSize="2xl"
                    isTruncated
                    mt="-4px"
                  >
                    ${index}000
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Flex>
                    <Avatar
                      name={job.author}
                      position="inherit"
                      width={6}
                      height={6}
                      src={job.imageUrl}
                    />
                    {
                      //   <Image
                      //   src="https://picsum.photos/200"
                      //   size={6}
                      //   fallbackSrc="https://via.placeholder.com/150"
                      //   rounded="full"
                      //   alt="sender-image"
                      // ></Image>
                    }
                    <Text ml={2}>{job.author}</Text>
                  </Flex>
                  <Box>
                    <Moment
                      //  fromNow
                      format="hh:mm"
                      ago={[true, false]}
                    >
                      {job.tweetDate}
                    </Moment>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Flex>
          <Text pt={8} pb={0} fontSize="lg">
            Recently Added
          </Text>

          <Box pr="6%">
            <Stack spacing={4}>
              <Box
                p={4}
                backgroundColor="white"
                shadow="none"
                onClick={onOpen}
                cursor="pointer"
                borderRadius={12}
              >
                <Flex justify="space-between">
                  <Flex w="calc(100vw - 210px)">
                    <Image
                      src="https://picsum.photos/200"
                      size={10}
                      mr="16px"
                      rounded={10}
                      alt="sender-image"
                    ></Image>
                    <Box
                      w={[
                        "calc(100vw - 210px)",
                        "calc(100vw - 210px)",
                        "initial",
                      ]}
                    >
                      <Heading isTruncated fontSize="lg">
                        New Job Title Opportunity
                      </Heading>

                      <Text color="gray.500" fontSize="sm" isTruncated>
                        by simplytammy
                      </Text>
                    </Box>
                  </Flex>
                  <Box pt={2}>
                    <Text fontSize="sm" isTruncated>
                      2 minutes
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Stack>
          </Box>

          <Text mt={8} fontSize="lg">
            Other Job Tweets
          </Text>

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
            {tweetJobs.slice(0, 7).map((tweet, index) => (
              <Box
                minW={[200, 240]}
                mr="16px"
                key={tweet.id}
                display="block"
                p={4}
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
                      src={tweet.imageUrl}
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
          </Flex>
          <Box mt={2} pr="6%">
            <Stack spacing={3}>
              <Box
                p={4}
                backgroundColor="white"
                shadow="none"
                onClick={onOpen}
                cursor="pointer"
                borderRadius={12}
              >
                <Flex justify="space-between">
                  <Flex w="calc(100vw - 210px)">
                    <Image
                      src="https://picsum.photos/200"
                      size={10}
                      mr="16px"
                      rounded={10}
                      alt="sender-image"
                    ></Image>
                    <Box
                      w={[
                        "calc(100vw - 210px)",
                        "calc(100vw - 210px)",
                        "initial",
                      ]}
                    >
                      <Heading isTruncated fontSize="lg">
                        New Job Title Opportunity
                      </Heading>

                      <Text color="gray.500" fontSize="sm" isTruncated>
                        by simplytammy
                      </Text>
                    </Box>
                  </Flex>
                  <Box pt={2}>
                    <Text fontSize="sm" isTruncated>
                      2 minutes
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Stack>
          </Box>
        </Stack>
        <JobDrawer isOpen={isOpen} onClose={onClose} />
        <br />
        <br />
        <br />
      </Box>
    </Box>
  );
}

export default Index;
