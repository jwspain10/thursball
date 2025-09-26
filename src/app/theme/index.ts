import { createTheme } from "@mantine/core";
import { components } from "./components";

export const theme = createTheme({
  fontFamily: `Lexend, sans-serif`,
  primaryColor: "teal",
  components: components,
});
