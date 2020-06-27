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
} from "@chakra-ui/core";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
export default function JobDrawer({ isOpen, onClose }) {
  const referenceField = useRef();

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
              We are looking for a few dudes who are interested in working with
              us for a huge project in view of an analytics company based in
              Lagos State.
            </Text>
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
          </Stack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
