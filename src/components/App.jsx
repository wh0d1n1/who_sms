import PropTypes from "prop-types";
import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import MotionLazyContainer from './animate/MotionLazyContainer';

import { defaultTheme } from "../styles/mui-theme";
import ThemeContext from "../containers/context/ThemeContext";
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import { ChartStyle } from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
/**
 * We will let users customize the colors but not other
 * parts of the theme object. Here we will take the string,
 * parse it, and merge it with other app theme defaults
 */
const formatTheme = newTheme => {
  return {
    ...defaultTheme,
    palette: newTheme.palette
  };
};

const App = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);
  let muiTheme = createMuiTheme(defaultTheme);
  try {
    // if a bad value is saved this will fail.
    muiTheme = createMuiTheme(theme);
  } catch (e) {
    console.error("failed to create theme", theme);
  }
  const handleSetTheme = newPalette => {
    if (newPalette === undefined) {
      // happpens when OrganizationWrapper unmounts
      setTheme(defaultTheme);
    } else {
      try {
        const newTheme = formatTheme(newPalette);
        setTheme(newTheme);
      } catch (e) {
        console.error("Failed to parse theme: ", newPalette);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ muiTheme, setTheme: handleSetTheme }}>
      <MotionLazyContainer>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <div styles={{ height: "100%" }}>{children}</div>
        </ThemeProvider>
      </MotionLazyContainer>
    </ThemeContext.Provider>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
