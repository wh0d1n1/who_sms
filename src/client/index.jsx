// i18n
import '../locales/i18n';

// highlight
import '../utils/highlight';

// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'react-image-lightbox/style.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Router, browserHistory } from "react-router";
import { StyleSheet } from "aphrodite";
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ApolloProvider  from "react-apollo";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import ApolloClientSingleton from "../network/apollo-client-singleton";
import { login, logout } from "./auth-service";
import errorCatcher from "./error-catcher";
import makeRoutes from "../routes";
import { store, persistor } from '../redux/store';
import { SettingsProvider } from '../contexts/SettingsContext';
import { CollapseDrawerProvider } from '../contexts/CollapseDrawerContext';
// import { AuthProvider } from '../contexts/JWTContext';   <AuthProvider>  </AuthProvider>m                                                               
// import { AuthProvider } from './contexts/Auth0Context';
// import { AuthProvider } from './contexts/FirebaseContext';
// import { AuthProvider } from './contexts/AwsCognitoContext';



window.onerror = (msg, file, line, col, error) => {
  errorCatcher(error);
};
window.addEventListener("unhandledrejection", event => {
  errorCatcher(event.reason);
});
window.AuthService = {
  login,
  logout
};

StyleSheet.rehydrate(window.RENDERED_CLASS_NAMES);

ReactDOM.render(
  <ApolloProvider client={ApolloClientSingleton}>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SettingsProvider>
              <CollapseDrawerProvider>
                <BrowserRouter>
                  <Router history={browserHistory} routes={makeRoutes()} />
                </BrowserRouter>
              </CollapseDrawerProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </PersistGate>
      </ReduxProvider>
    </HelmetProvider>
  </ApolloProvider>,
  document.getElementById("mount")
);
