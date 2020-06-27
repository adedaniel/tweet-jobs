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
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

function Index() {
  const [jobs, setJobs] = useState([]);
  const referenceField = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tweetJobs, setTweetJobs] = useState([]);
  const [dragDown, setDragDown] = useState(false);
  // const [rowWidth, setRowWidth] = useState(
  //   typeof document !== "undefined" &&
  //     (1 / 1.7) * document.querySelector("body").clientWidth
  // );
  // useEffect(() => {
  //   Axios.get("https://seejobs.herokuapp.com/api/v1/jobs")
  //     .then((result) => {
  //       // console.log(result.data);
  //       setJobs(result.data.results);
  //     })
  //     .catch((error) => {
  //       // setIsLoading(false);

  //       console.log(error.response);
  //     });
  //   Axios.get("https://seejobs.herokuapp.com/api/v1/tweetjobs")
  //     .then((result) => {
  //       // console.log(result.data);
  //       setTweetJobs(result.data.results);
  //     })
  //     .catch((error) => {
  //       // setIsLoading(false);

  //       console.log(error.response);
  //     });
  // }, []);

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
          <Text fontWeight="bold" my={1} fontSize="lg">
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
          <Text fontWeight="bold" pt={8} pb={3} fontSize="lg">
            Recently Added
          </Text>

          <Box pr="6%">
            <Stack spacing={4}>
              <Box
                p={4}
                backgroundColor="white"
                shadow="none"
                onClick={onOpen}
                borderRadius={12}
              >
                <Flex>
                  <Box mr="16px">
                    <Image
                      src="https://picsum.photos/200"
                      size={10}
                      rounded={10}
                      alt="sender-image"
                    ></Image>
                  </Box>
                  <Box width="88%">
                    <Heading isTruncated fontSize="lg">
                      New Job Title
                    </Heading>
                    <Text color="gray.500" fontSize="sm" isTruncated>
                      by simplytammy
                    </Text>
                  </Box>
                  <Box pt={2}>
                    <Text fontSize="sm" isTruncated>
                      2 hours ago
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box
                p={4}
                backgroundColor="white"
                shadow="none"
                borderRadius={12}
              >
                <Flex>
                  <Box mr="16px">
                    <Image
                      src="https://picsum.photos/200"
                      size={10}
                      rounded={10}
                      alt="sender-image"
                    ></Image>
                  </Box>
                  <Box width="88%">
                    <Heading isTruncated fontSize="lg">
                      New Job Title
                    </Heading>
                    <Text color="gray.500" fontSize="sm" isTruncated>
                      by simplytammy
                    </Text>
                  </Box>
                  <Box pt={2}>
                    <Text fontSize="sm" isTruncated>
                      2 hours ago
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Stack>
          </Box>

          <Text fontWeight="bold" mt={8} fontSize="lg">
            Other Job Tweets
          </Text>

          <Flex
            pt={1}
            style={{ flexFlow: "nowrap" }}
            overflowX="scroll"
            overflowY="hidden"
            display="flex"
            className="savedJobsRow"
            ml="-7%"
            px="7%"
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
                borderRadius={12}
              >
                <Flex>
                  <Box mr="16px">
                    <Image
                      src="https://picsum.photos/200"
                      size={10}
                      rounded={10}
                      alt="sender-image"
                    ></Image>
                  </Box>
                  <Box width="88%">
                    <Heading isTruncated fontSize="md">
                      New Job Title
                    </Heading>
                    <Text color="gray.500" fontSize="xs" isTruncated>
                      by simplytammy
                    </Text>
                  </Box>
                  <Box pt={2}>
                    <Text fontSize="sm" isTruncated>
                      2 hours ago
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Stack>
          </Box>
        </Stack>
        <Drawer
          initialFocusRef={referenceField}
          placement="bottom"
          onClose={onClose}
          isOpen={isOpen}
        >
          <DrawerOverlay />
          <DrawerContent
            ref={referenceField}
            borderRadius={["20px 20px 0 0", "20px 20px 0 0", "30px 30px 0 0"]}
            height={["85%", "85%", "85%", "75%"]}
          >
            <DrawerCloseButton top={4} right={[4, 8]} />
            <DrawerHeader borderBottomWidth="0px">
              <Box
                height="6px"
                width="50%"
                margin="0 auto"
                cursor={"row-resize"}
                onClick={onClose}
                backgroundColor="gray.200"
                rounded={8}
              ></Box>
            </DrawerHeader>
            <DrawerBody px={["6%", "20%"]}>
              <Box mt={4} textAlign="center">
                <Avatar
                  name={"job name"}
                  position="inherit"
                  width={[16, 20]}
                  height={[16, 20]}
                  src={"https://bit.ly/dan-abramov"}
                />
                <Heading mt={3} fontWeight="bold" fontSize={["xl", "2xl"]}>
                  A full time job description about a new job opening
                </Heading>

                <Stack justify="center" isInline spacing={5} my={4}>
                  <Badge
                    variant="subtle"
                    variantColor="green"
                    px={3}
                    pt="6px"
                    height={8}
                    fontSize="sm"
                  >
                    Remote
                  </Badge>
                </Stack>

                <Box>
                  <Stack justifyContent="center" isInline spacing={3}>
                    <Avatar
                      name={"job author"}
                      position="inherit"
                      width={6}
                      height={6}
                      src={"https://bit.ly/dan-abramov"}
                    />

                    <Text color="gray.500">
                      <Link
                        textDecoration="none !important"
                        href="https://chakra-ui.com"
                        isExternal
                      >
                        Dan_Abramov
                      </Link>
                    </Text>
                  </Stack>
                </Box>
              </Box>
              <Box mt={8}>
                <Text fontSize="lg">
                  We are looking for a few dudes who are interested in working
                  with us for a huge project in view of an analytics company
                  based in Lagos State.
                </Text>
              </Box>
            </DrawerBody>
            <DrawerFooter
              px={["6%", "20%"]}
              justifyContent="center"
              pb={[8, 16]}
            >
              <Stack display="flex" justify="center" spacing={3}>
                <Box>
                  <IconButton
                    variant="ghost"
                    aria-label="Save Job"
                    fontSize="20px"
                    icon={MdFavoriteBorder}
                  />
                  <Button
                    as="a"
                    target="_blank"
                    href="https://chakra-ui.com"
                    variant="solid"
                    variantColor="primary"
                    width="3xs"
                    height={12}
                    color="white"
                    backgroundColor="primary"
                  >
                    Apply
                  </Button>
                </Box>
              </Stack>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <br />
        <br />
        <br />
      </Box>
    </Box>
  );
}

export default Index;
