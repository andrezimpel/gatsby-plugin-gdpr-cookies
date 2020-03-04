import ReactGA from "react-ga";
import Cookies from "universal-cookie";
import merge from "lodash/merge";

import defaultOptions from "./defaultOptions";
import {
  validGATrackingId,
  validFbPixelId,
  validGTMTrackingId
} from "./validTrackingId";

const cookies = new Cookies();
const currentEnvironment =
  process.env.ENV || process.env.NODE_ENV || "development";

const isEnvironmentValid = environments => {
  return environments.includes(currentEnvironment);
};

// init

export const onClientEntry = (_, pluginOptions = {}) => {
  const options = merge(defaultOptions, pluginOptions);

  if (isEnvironmentValid(options.environments)) {
    // google analytics
    if (
      cookies.get(options.googleAnalytics.cookieName) === "true" &&
      validGATrackingId(options)
    ) {
      ReactGA.initialize(options.googleAnalytics.trackingId);
    }

    // facebook pixel
    if (
      cookies.get(options.facebookPixel.cookieName) === "true" &&
      validFbPixelId(options) &&
      typeof window.fbq === `function`
    ) {
      window.fbq("init", options.facebookPixel.pixelId);
    }
  }
};

// track

export const onRouteUpdate = ({ location }, pluginOptions = {}) => {
  const options = merge(defaultOptions, pluginOptions);

  if (isEnvironmentValid(options.environments)) {
    // google analytics
    if (
      cookies.get(options.googleAnalytics.cookieName) === "true" &&
      validGATrackingId(options) &&
      ReactGA.ga
    ) {
      let gaAnonymize = options.googleAnalytics.anonymize;
      gaAnonymize = gaAnonymize !== undefined ? gaAnonymize : true;
      ReactGA.set({ page: location.pathname, anonymizeIp: gaAnonymize });
      ReactGA.pageview(location.pathname);
    }

    // google tag manager
    if (
      cookies.get(options.googleTagManager.cookieName) === "true" &&
      validGTMTrackingId(options)
    ) {
      setTimeout(() => {
        const data = options.googleTagManager.dataLayerName
          ? window[options.googleTagManager.dataLayerName]
          : window.dataLayer;

        if(typeof data === "object") {
          data.push({ event: "gatsbyRouteChange" });
        }
      }, 50);
    }

    // facebook pixel
    if (
      cookies.get(options.facebookPixel.cookieName) === "true" &&
      validFbPixelId(options) &&
      typeof window.fbq === `function`
    ) {
      window.fbq("track", "PageView");
    }
  }
};
