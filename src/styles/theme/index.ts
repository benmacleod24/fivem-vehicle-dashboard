import { extendTheme } from "@chakra-ui/react";

// Theme Imports
import { config } from "./config";
import { colors } from "./config/colors";
import { styles } from "./config/global-styles";

// Component Imports
import { components } from "./components";

const theme = extendTheme({ config, colors, styles, components });

// Expor theme as default
export default theme;
