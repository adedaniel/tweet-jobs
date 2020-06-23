import React from "react";
import { Flex, Icon, IconButton, Box, Link } from "@chakra-ui/core";
import { RiMenu2Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { IoIosOptions } from "react-icons/io";
export default function Appbar() {
  return (
    <>
      <Flex justify="space-between" px="5%" py={10}>
        <Box className="openMenu">
          <input type="checkbox" className="toggler" />
          <div className="hamburger">
            <div></div>
          </div>
          {
            // <Box size={8} as={RiMenu2Line}></Box>
          }
          {
            <div className="menu">
              <div>
                <div>
                  <ul className="p-0 my-5">
                    <li>
                      <Link href="/">
                        <a className="nav-link js-scroll-trigger">Home</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/ncdc">
                        <a className="nav-link js-scroll-trigger">NCDC</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/infographics">
                        <a className="nav-link js-scroll-trigger">
                          Infographics
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/news">
                        <a className="nav-link js-scroll-trigger">News</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq">
                        <a className="nav-link js-scroll-trigger">FAQs</a>
                      </Link>
                    </li>
                  </ul>
                  <span className="d-block">
                    <span className="text-secondary"> adedaniel</span>{" "}
                    <a target="_blank" href="https://github.com/adedaniel">
                      <i
                        className="fa text-secondary fa-github"
                        aria-hidden="true"
                      ></i>
                    </a>
                    &nbsp;{" "}
                    <a
                      target="_blank"
                      href="https://twitter.com/ijebu_developer"
                    >
                      <i
                        className="fa text-secondary fa-twitter"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          }
        </Box>
        <Box display="flex" flexDirection="row">
          <Box mx={4} size={8} as={FiSearch}></Box>
          <Box ml={4} size={8} as={IoIosOptions}></Box>
        </Box>
      </Flex>
      <style jsx>{`
      
        .Toggler {
          background: transparent;
          border: none;
        }
        .menu-wrap {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 2;
        }

        .toggler {
          position: absolute;

          width: 3rem;
          height: 2rem;
          z-index: 3;
          opacity: 0;
          cursor: pointer;
        }

        .hamburger {
          position: absolute;
          width: 3rem;
          height: 2rem;
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
          background-color: #1a202c;
          transition: 0.4s;
        }

        .hamburger > div:before {
          content: "";
          position: absolute;
          width: 2.5rem;
          height: 3px;
          border-radius: 1.5px;
          background-color: #1a202c;
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
          background-color: #1a202c;
          top: 10px;
          left: 0;
          transition: 0.4s;
        }

        .toggler:checked + .hamburger > div {
          transform: rotate(135deg);
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
