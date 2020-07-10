import React from "react";
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
import theme from "../../theme.js";
import JobDrawer from "../../components/job-drawer.jsx";

function FeaturedGallery({ job }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { colors } = theme;
  const colorValues = [
    "#d5cbe0",
    colors.gray[200],
    "#96d0c8",
    "#87ccd8",
    colors.primary[200],
  ];
  const openDrawer = (job) => {
    setSelectedJob(job);
    onOpen();
  };
  return (
    <Box
      minW={[235, 240]}
      mr="16px"
      display="block"
      key={job.id}
      p={4}
      pt={4}
      bg={colorValues[Math.floor(Math.random(0, 4) * colorValues.length)]}
      cursor="pointer"
      wordBreak="break-word"
      transition=".7s all"
      onClick={onOpen}
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
            visibility: job.isRemote == "true" ? "visible" : "hidden",
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
      <JobDrawer isOpen={isOpen} selectedJob={job} onClose={onClose} />
    </Box>
  );
}
export default React.memo(FeaturedGallery);
