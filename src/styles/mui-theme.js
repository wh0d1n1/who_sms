import { createMuiTheme } from "@material-ui/core/styles";

/**
 * This is the default theme to be used in the app
 * when there is no organization theme to show or use
 */
const defaultTheme = {
  palette: {
    type: "light",
    primary: {
      main: "#ff0400"
    },
    secondary: {
      main: "#737373"
    },
    warning: {
      main: "#fabe28"
    },
    info: {
      main: "#3f80b2"
    }
  }
};

let theme = createMuiTheme(defaultTheme);

export { defaultTheme };

export default theme;
