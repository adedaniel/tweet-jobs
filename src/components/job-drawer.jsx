import React, { useState, useRef } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  Box,
  DrawerBody,
  Avatar,
  Heading,
  Stack,
  Badge,
  Link,
  Text,
  DrawerFooter,
  IconButton,
  Button,
  PseudoBox,
} from "@chakra-ui/core";
import Moment from "react-moment";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
export default function JobDrawer({ isOpen, onClose, selectedJob }) {
  const referenceField = useRef();
  const {
    imageUrl,
    isRemote,
    likelyJobNames,
    profile_image_url,
    id,
    tweetID,
    cleanedTweet,
    tweetDate,
    author,
    urls,
  } = selectedJob;

  return (
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
        height={["70%", "70%", "70%", "65%"]}
      >
        <DrawerCloseButton top={4} right={[4, 8]} />
        <DrawerHeader borderBottomWidth="0px">
          <PseudoBox
            height="6px"
            width="50%"
            display="block"
            margin="0 auto"
            draggable
            cursor="grab"
            transition="0.5s all"
            // onClick={onClose}
            _hover={{
              backgroundColor: "gray.300",
              width: "51%",
            }}
            _grabbed={{ cursor: "grabbing" }}
            onDragEnd={(e) => e.clientY > 250 && onClose()}
            backgroundColor="gray.200"
            rounded={8}
          ></PseudoBox>
        </DrawerHeader>
        <DrawerBody px={["6%", "20%"]}>
          <Box mt={4} textAlign="center">
            <Avatar
              name={author}
              position="inherit"
              width={[16, 20]}
              height={[16, 20]}
              src={urls ? imageUrl : profile_image_url}
            />
            <Heading mt={3} mb={2} fontWeight="bold" fontSize={["xl", "2xl"]}>
              {likelyJobNames}
            </Heading>
            {isRemote === "true" && (
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
            )}

            <Box>
              <Stack color="gray.500" isInline justifyContent="center">
                <Stack isInline spacing={3}>
                  {urls && (
                    <Avatar
                      name={author}
                      position="inherit"
                      width={6}
                      height={6}
                      src={profile_image_url}
                    />
                  )}

                  <Text>
                    <Link
                      textDecoration="none !important"
                      href={`https://twitter.com/${author}`}
                      isExternal
                    >
                      @{author}
                    </Link>
                  </Text>
                </Stack>
                {tweetDate && (
                  <>
                    <Text> | &nbsp;</Text>
                    <Text>
                      <Moment fromNow>{tweetDate}</Moment>
                    </Text>
                  </>
                )}
              </Stack>
            </Box>
          </Box>
          <Box mt={8}>
            <Text fontSize="lg">{cleanedTweet}</Text>
          </Box>
        </DrawerBody>
        <DrawerFooter px={["6%", "20%"]} justifyContent="center" pb={[8, 16]}>
          <Stack isInline justify="center" spacing={3}>
            <IconButton
              variant="ghost"
              aria-label="Save Job"
              fontSize="20px"
              icon={MdFavoriteBorder}
            />
            <Button
              as="a"
              target="_blank"
              href={
                urls
                  ? urls.slice(0, -1)
                  : `https://twitter.com/${author}/status/${tweetID}`
              }
              variant="solid"
              variantColor="primary"
              width="3xs"
              height={12}
              color="white"
              // backgroundColor="primary"
            >
              Apply
            </Button>
          </Stack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
