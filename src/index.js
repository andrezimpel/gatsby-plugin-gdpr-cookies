import ReactGA from "react-ga"
import Cookies from "universal-cookie"

import {
  validGATrackingId,
  validFbPixelId,
  validGTMTrackingId,
} from "./valid-tracking-id"

const cookies = new Cookies()

const currentEnvironment =
  process.env.ENV || process.env.NODE_ENV || `development`

const isEnvironmentValid = environments => {
  return environments.includes(currentEnvironment)
}

// initializing helpers
const initGoogleAnalytics = (options) => {
  if (
    cookies.get(options.googleAnalytics.cookieName) === `true` &&
    validGATrackingId(options)
  ) {
    ReactGA.initialize(options.googleAnalytics.trackingId)
    window.GoogleAnalyticsIntialized = true
  }
}

const initFacebookPixel = (options) => {
  if (
    cookies.get(options.facebookPixel.cookieName) === `true` &&
    validFbPixelId(options) &&
    typeof window.fbq === `function`
  ) {
    window.fbq(`init`, options.facebookPixel.pixelId)
    window.FacebookPixelInitialized = true
  }
}

const checkIfGoogleAnalyticsIsInitilized = () => !!window.GoogleAnalyticsIntialized
const checkIfFacebookPixelIsInitilized = () => !!window.FacebookPixelInitialized

export const initializePlugin = (options) => {
  if (isEnvironmentValid(options.environments)) {
    // google analytics
    initGoogleAnalytics(options)

    // facebook pixel
    initFacebookPixel(options)
  }
}

export const trackVisit = (options, location) => {
  if (isEnvironmentValid(options.environments)) {
    // google analytics
    if (!checkIfGoogleAnalyticsIsInitilized()) initGoogleAnalytics(options);
    if (
      cookies.get(options.googleAnalytics.cookieName) === `true` &&
      validGATrackingId(options) &&
      ReactGA.ga
    ) {
      console.log('tracking analytics');
      let gaAnonymize = options.googleAnalytics.anonymize
      let gaAllowAdFeatures = options.googleAnalytics.allowAdFeatures
      gaAnonymize = gaAnonymize !== undefined ? gaAnonymize : true
      gaAllowAdFeatures = gaAllowAdFeatures !== undefined ? gaAllowAdFeatures : true
      ReactGA.set({ page: location.pathname, anonymizeIp: gaAnonymize, allowAdFeatures: gaAllowAdFeatures })
      ReactGA.pageview(location.pathname)
    }

    // google tag manager
    if (
      cookies.get(options.googleTagManager.cookieName) === `true` &&
      validGTMTrackingId(options)
    ) {
      setTimeout(() => {
        const data = options.googleTagManager.dataLayerName
          ? window[options.googleTagManager.dataLayerName]
          : window.dataLayer

        if (typeof data === `object`) {
          const eventName = options.googleTagManager.routeChangeEvent || `gatsbyRouteChange`
          data.push({ event: eventName })
        }
      }, 50)
    }

    // facebook pixel
    if (!checkIfFacebookPixelIsInitilized()) initFacebookPixel(options);
    if (
      cookies.get(options.facebookPixel.cookieName) === `true` &&
      validFbPixelId(options) &&
      typeof window.fbq === `function`
    ) {
      window.fbq(`track`, `PageView`)
    }
  }
}

export const initializeAndTrack = (location) => {
  const options = window.gatsbyPluginGDPRCookiesOptions

  if (location === undefined || location === null) {
    console.error('Please provide a reach router location to the initializeAndTrack function.')
  } else {
    trackVisit(options, location)
  }
}
