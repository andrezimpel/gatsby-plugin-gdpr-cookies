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
    initializeAndTrackGoogleAnalytics(options.googleAnalytics, location)
    initializeAndTrackGoogleTagManager(options.googleTagManager, location)
    initializeAndTrackFacebookPixel(options.facebookPixel)
  }
}
