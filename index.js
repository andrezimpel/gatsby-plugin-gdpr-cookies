const {
  initializeAndTrackGoogleAnalytics,
  initializeAndTrackGoogleTagManager,
  initializeAndTrackFacebookPixel,
} = require('./services')

exports.initializeAndTrack = (location) => {
  const options = window.gatsbyPluginGDPRCookiesOptions

  if (location === undefined || location === null) {
    console.error('Please provide a reach router location to the initializeAndTrack function.')
  } else {
    // initializeAndTrackGoogleAnalytics(options.googleAnalytics, location)
    initializeAndTrackGoogleTagManager(options.googleTagManager, location)
    initializeAndTrackFacebookPixel(options.facebookPixel)
  }
}




















// import Cookies from "universal-cookie"
//
// import {
//   validGATrackingId,
//   validFbPixelId,
//   validGTMTrackingId,
// } from "./valid-tracking-id"
//
// const cookies = new Cookies()
//
// const currentEnvironment =
//   process.env.ENV || process.env.NODE_ENV || `development`
//
// const isEnvironmentValid = environments => {
//   return environments.includes(currentEnvironment)
// }
//
// // initializing helpers
// const initGoogleAnalytics = (options) => {
//   if (
//     cookies.get(options.googleAnalytics.cookieName) === `true` &&
//     validGATrackingId(options)
//   ) {
    // window.dataLayer = window.dataLayer || [];
    // window.gtag = function(){window.dataLayer.push(arguments);}
    // window.gtag('js', new Date())
    // window[`ga-disable-${options.googleAnalytics.trackingId}`] = false
    //
    // let gaAnonymize = options.googleAnalytics.anonymize
    // let gaAllowAdFeatures = options.googleAnalytics.allowAdFeatures
    // gaAnonymize = gaAnonymize !== undefined ? gaAnonymize : true
    // gaAllowAdFeatures = gaAllowAdFeatures !== undefined ? gaAllowAdFeatures : true
    //
    // window.gtag('config', options.googleAnalytics.trackingId, {
    //   'anonymize_ip': gaAnonymize,
    //   'allow_google_signals': gaAllowAdFeatures
    // })
//     window.GoogleAnalyticsIntialized = true
//   } else {
//     window[`ga-disable-${options.googleAnalytics.trackingId}`] = true
//   }
// }
//
// const initFacebookPixel = (options) => {
//   if (
//     cookies.get(options.facebookPixel.cookieName) === `true` &&
//     validFbPixelId(options) &&
//     typeof window.fbq === `function`
//   ) {
//     window.fbq(`init`, options.facebookPixel.pixelId)
//     window.FacebookPixelInitialized = true
//   }
// }
//
// const checkIfGoogleAnalyticsIsInitilized = () => !!window.GoogleAnalyticsIntialized
// const checkIfFacebookPixelIsInitilized = () => !!window.FacebookPixelInitialized
//
// export const initializePlugin = (options) => {
//   if (isEnvironmentValid(options.environments)) {
//     // google analytics
//     initGoogleAnalytics(options)
//
//     // facebook pixel
//     initFacebookPixel(options)
//   }
// }
//
// export const trackVisit = (options, location) => {
//   if (isEnvironmentValid(options.environments)) {
//     // google analytics
//     if (!checkIfGoogleAnalyticsIsInitilized()) initGoogleAnalytics(options);
//
//     // also look fot gtag
//     if (
//       cookies.get(options.googleAnalytics.cookieName) === `true` &&
//       validGATrackingId(options) &&
//       typeof window.gtag === "function"
//     ) {
//       const pagePath = location ? location.pathname + location.search + location.hash : undefined
//
//       window.gtag(`event`, `page_view`, { page_path: pagePath })
//     }
//
//     // google tag manager
//     if (
//       cookies.get(options.googleTagManager.cookieName) === `true` &&
//       validGTMTrackingId(options)
//     ) {
//       setTimeout(() => {
//         const data = options.googleTagManager.dataLayerName
//           ? window[options.googleTagManager.dataLayerName]
//           : window.dataLayer
//
//         if (typeof data === `object`) {
//           const eventName = options.googleTagManager.routeChangeEvent || `gatsbyRouteChange`
//           data.push({ event: eventName })
//         }
//       }, 50)
//     }
//
//     // facebook pixel
//     if (!checkIfFacebookPixelIsInitilized()) initFacebookPixel(options);
//     if (
//       cookies.get(options.facebookPixel.cookieName) === `true` &&
//       validFbPixelId(options) &&
//       typeof window.fbq === `function`
//     ) {
//       window.fbq(`track`, `PageView`)
//     }
//   }
// }
//
// export const initializeAndTrack = (location) => {
//   const options = window.gatsbyPluginGDPRCookiesOptions
//
//   if (location === undefined || location === null) {
//     console.error('Please provide a reach router location to the initializeAndTrack function.')
//   } else {
//     trackVisit(options, location)
//   }
// }
