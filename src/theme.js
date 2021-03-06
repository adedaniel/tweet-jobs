import { theme as chakraTheme } from "@chakra-ui/core";
// import { useColorMode, Switch } from "@chakra-ui/core";

const fonts = { ...chakraTheme.fonts, mono: `'Menlo', monospace` };

const breakpoints = ["576px", "768px", "992px"];

//#65b77a
const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    black: "#16161D",
    grey: {
      50: "#f8fcff",
    },
    primary: {
      50: "#e6faed",
      100: "#c7e8d3",
      200: "#a6d7b6",
      300: "#84c698",
      400: "#63b678",
      500: "#65b77a",
      600: "#387a51",
      700: "#26573c",
      800: "#133526",
      900: "#001309",
    },
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Raleway, sans-serif",
    mono: "Raleway, sans-serif",
  },
  breakpoints,
  icons: {
    ...chakraTheme.icons,
    logo: {
      path: (
        <svg
          width="3000"
          height="3163"
          viewBox="0 0 3000 3163"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="3000" height="3162.95" fill="none" />
          <path
            d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
            fill="currentColor"
          />
        </svg>
      ),
      viewBox: "0 0 3000 3163",
    },
  },
};

export default theme;
