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
} from "@chakra-ui/core";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import Appbar from "../components/appbar";

const Index = () => (
  <Box backgroundColor="gray.100" pb={10}>
    <Appbar />

    <Box>
      <Stack pl="6%">
        <Text style={{ marginBottom: "-4px" }} color="gray.600" fontSize="lg">
          Hello Klen,
        </Text>
        <Text my={0} fontWeight="extrabold" fontSize="5xl">
          Your Jobs
        </Text>
        <Text fontWeight="bold" my={1} fontSize="lg">
          Saved Jobs
        </Text>
        <Flex
          pt={1}
          style={{ flexFlow: "nowrap" }}
          overflowX="scroll"
          overflowY="hidden"
          display="flex"
          ml="-7%"
          px="7%"
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(() => (
            <Box
              minW={250}
              mr="16px"
              display="block"
              p={4}
              border="2px solid"
              borderColor="gray.50"
              borderRadius={16}
              height={300}
              backgroundColor="white"
            >
              <Text height={120} mb={70} fontSize="2xl">
                {"Residential Counselor - Torrey House, Haverford - CareLink Community Support Services".replace(
                  /(.{48})..+/,
                  "$1…"
                )}
              </Text>
              <Flex justify="space-between">
                <Badge
                  variant="subtle"
                  variantColor="green"
                  px={3}
                  py={1}
                  mb={4}
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
                  $5000
                </Text>
              </Flex>
              <Flex justify="space-between">
                <Flex>
                  <Image
                    src="https://picsum.photos/200"
                    size={6}
                    rounded="full"
                    alt="sender-image"
                  ></Image>

                  <Text ml={2}>A user</Text>
                </Flex>
                <Box>13:08</Box>
              </Flex>
            </Box>
          ))}
        </Flex>

        <Text fontWeight="bold" pt={8} pb={3} fontSize="lg">
          Recently Added
        </Text>

        <Box pr="6%">
          <Stack spacing={4}>
            <Box p={4} backgroundColor="white" shadow="none" borderRadius={12}>
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
            <Box p={4} backgroundColor="white" shadow="none" borderRadius={12}>
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
                  <Text fontSize="sm">2 hours ago</Text>
                </Box>
              </Flex>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  </Box>
);

export default Index;
