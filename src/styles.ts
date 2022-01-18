import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    body: "Inter",
    heading: "Inter",
  },
  components: {
    Heading: {
      baseStyle: {
        color: "gray.300",
        fontWeight: "400",
      },
    },
  },
  colors: {
    background: "#f8faff",
    herotitle: "#2d3958",
    gray: {
      "50": "#EEF0F6",
      "100": "#D0D6E7",
      "200": "#B1BCD7",
      "300": "#93A2C8",
      "400": "#7588B8",
      "500": "#566DA9",
      "600": "#455787",
      "700": "#344265",
      "800": "#232C43",
      "900": "#111622",
    },
    blue: {
      "50": "#E8E5FF",
      "100": "#C0B8FF",
      "200": "#978AFF",
      "300": "#6F5CFF",
      "400": "#432AFF",
      "500": "#1E00FF",
      "600": "#1800CC",
      "700": "#120099",
      "800": "#0C0066",
      "900": "#060033",
    },
    purple: {
      "50": "#EDE8FD",
      "100": "#CDBEF8",
      "200": "#AE95F4",
      "300": "#8E6CEF",
      "400": "#5927E8",
      "500": "#4E19E6",
      "600": "#3E14B8",
      "700": "#2F0F8A",
      "800": "#1F0A5C",
      "900": "#10052E",
    },
  },
});
