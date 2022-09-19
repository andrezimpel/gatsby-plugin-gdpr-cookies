const {
  initializeAndTrackGoogleAnalytics,
  initializeAndTrackGoogleTagManager,
  initializeAndTrackFacebookPixel,
  initializeAndTrackTikTokPixel,
  initializeAndTrackHotjar,
  initializeChatwoot,
  initializeLinkedin,
} = require('./services')

const { isEnvironmentValid } = require('./helper')

exports.initializeAndTrack = (location) => {
  const options = window.gatsbyPluginGDPRCookiesOptions

  if (!isEnvironmentValid(options.environments)) {
    console.warn(`Tracking not activated as ${options.environments.join(', ')} does not match ${process?.env?.NODE_ENV}`);
  }

  if (location === undefined || location === null) {
    console.error('Please provide a reach router location to the initializeAndTrack function.')
    return;
  }

  initializeAndTrackGoogleAnalytics(options.googleAnalytics, location)
  initializeAndTrackGoogleTagManager(options.googleTagManager, location)
  initializeAndTrackFacebookPixel(options.facebookPixel)
  initializeAndTrackTikTokPixel(options.tikTokPixel)
  initializeAndTrackHotjar(options.hotjar)
  initializeChatwoot(options.chatwoot)
  initializeLinkedin(options.linkedin)
}
