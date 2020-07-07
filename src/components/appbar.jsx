import React, { useState } from "react";
import {
  Flex,
  Icon,
  IconButton,
  Box,
  Text,
  Stack,
  Heading,
  Button,
} from "@chakra-ui/core";
import Link from "next/link";
import { FiSearch, FiLogOut } from "react-icons/fi";
import { IoIosOptions } from "react-icons/io";
import FadeIn from "react-fade-in";
export default function Appbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Flex
        justify="space-between"
        pl={["2%", "7%"]}
        pr={["4%", "8%"]}
        pt={10}
        pb={4}
      >
        <Box className="openMenu">
          <input
            type="checkbox"
            onClick={() => setOpen(!open)}
            className="toggler"
          />
          <div className="hamburger">
            <div></div>
          </div>
          <div className="menu">
            <div>
              <Box h="100vh" w="100vw">
                <Box px={("8%", "8%")} pt={8}>
                  <Flex justify="flex-end">
                    <Button
                      fontWeight="normal"
                      variant="ghost"
                      position="fixed"
                      rightIcon={FiLogOut}
                      color="gray.500"
                      fontSize="lg"
                    >
                      Logout
                    </Button>
                  </Flex>
                  <Stack textAlign={["left", "left", "center"]} my={24}>
                    {open && (
                      <FadeIn transitionDuration={800} delay={150}>
                        <Heading
                          mb={[8, 8, 8, 6]}
                          fontSize={["4xl", "4xl", "5xl"]}
                        >
                          <Link href="/">
                            <a> Home</a>
                          </Link>
                        </Heading>
                        <Heading
                          mb={[8, 8, 8, 6]}
                          fontSize={["4xl", "4xl", "5xl"]}
                        >
                          <Link href="/jobs">
                            <a>All Jobs</a>
                          </Link>
                        </Heading>
                        <Heading
                          mb={[8, 8, 8, 6]}
                          fontSize={["4xl", "4xl", "5xl"]}
                        >
                          <Link href="/tweets">
                            <a>Job Tweets</a>
                          </Link>
                        </Heading>
                        <Heading
                          mb={[8, 8, 8, 6]}
                          fontSize={["4xl", "4xl", "5xl"]}
                        >
                          <Link href="/saved">
                            <a>Saved Jobs</a>
                          </Link>
                        </Heading>
                        <Heading
                          mb={[8, 8, 8, 6]}
                          fontSize={["4xl", "4xl", "5xl"]}
                        >
                          <Link href="/settings">
                            <a>Preferences</a>
                          </Link>
                        </Heading>
                      </FadeIn>
                    )}
                  </Stack>
                </Box>
              </Box>
            </div>
          </div>
        </Box>
        <Box mt="-4px" display="flex" flexDirection="row">
          <Link href="/search">
            <Box
              cursor="pointer"
              ml={4}
              mr={[2, 4]}
              size={8}
              as={FiSearch}
            ></Box>
          </Link>
          <Box ml={[2, 4]} size={8} as={IoIosOptions}></Box>
        </Box>
      </Flex>
      <style jsx>{`
        .menu-wrap {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 2;
        }

        .toggler {
          position: absolute;

          width: 3rem;
          height: 1.5rem;
          z-index: 3;
          opacity: 0;
          cursor: pointer;
        }

        .hamburger {
          position: absolute;
          width: 3rem;
          height: 1.5rem;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: transparent;
        }

        .hamburger > div {
          position: absolute;
          width: 60%;
          height: 3px;
          border-radius: 1.5px;
          background-color: black;
          transition: 0.4s;
        }

        .hamburger > div:before {
          content: "";
          position: absolute;
          width: 2.4rem;
          height: 3px;
          border-radius: 1.5px;
          background-color: black;
          top: -10px;
          left: 0;
          transition: 0.4s;
        }

        .hamburger > div:after {
          content: "";
          position: absolute;
          width: 0;
          height: 3px;
          border-radius: 1.5px;
          background-color: black;
          top: 10px;
          left: 0;
          transition: 0.4s;
        }

        .toggler:checked + .hamburger > div {
          transform: rotate(135deg);
        }
        .toggler:checked,
        .toggler:checked + .hamburger {
          position: fixed;
        }
        .toggler:checked:hover + .hamburger > div {
          transform: rotate(225deg);
        }

        .toggler:checked + .hamburger > div:before,
        .toggler:checked + .hamburger > div:after {
          width: 1.8rem;
          top: 0;
          transform: rotate(90deg);
        }

        .menu {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          visibility: hidden;
          transition: 0.6s;
        }

        .menu > div {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-150%) translateY(-50%);
          width: 1600px;
          height: 1600px;
          border-radius: 50%;
          background-color: white;
          opacity: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          transition: 0.6s;
        }

        .menu > div > div {
          max-width: 90vw;
          max-height: 100vh;
          opacity: 0;
          transition: 0.6s;
        }

        .menu > div > div > ul > li {
          list-style: none;
        }

        .menu > div > div > ul > li > a {
          text-decoration: none;
          color: grey;
          font-weight: 550;
          text-transform: uppercase;
          margin-top: 0.5rem;
          transition: 0.3s;
          font-size: x-large;
          display: inline-block;
        }

        .menu > div > div > ul > li > a:hover {
          color: grey;
        }

        .toggler:checked ~ .menu {
          visibility: visible;
        }

        .toggler:checked ~ .menu > div {
          transform: translateX(-50%) translateY(-50%);
        }

        .toggler:checked ~ .menu > div > div {
          opacity: 1;
        }

        .nav-link {
          padding: 0 !important;
        }
      `}</style>
    </>
  );
}
