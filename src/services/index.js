const {
  validGATrackingId,
  validGTMTrackingId,
  validFbPixelId,
  validTikTokPixelId,
  validHotjarId,
  validChatwootConfig,
  validLinkedinTrackingId,
  getCookie
} = require('../helper')

const {
  addGoogleAnalytics,
  initializeGoogleAnalytics,
  trackGoogleAnalytics
} = require('./google-analytics')

const {
  addGoogleTagManager,
  initializeGoogleTagManager,
  trackGoogleTagManager
} = require('./google-tag-manager')

const {
  addFacebookPixel,
  initializeFacebookPixel,
  trackFacebookPixel
} = require('./facebook')

const {
  addTikTokPixel,
  initializeTikTokPixel,
  trackTikTokPixel
} = require('./tiktok')

const {
  addHotjar,
  initializeHotjar,
  trackHotjar
} = require('./hotjar')

const {
  addChatwoot
} = require('./chatwoot')

const {
  addLinkedin,
  initializeLinkedin
} = require('./linkedin')

exports.initializeAndTrackGoogleAnalytics = (options, location) => {
  if (
    getCookie(options.cookieName) === `true` &&
    validGATrackingId(options)
  ) {
    addGoogleAnalytics(options).then((status) => {
      if (status) {
        initializeGoogleAnalytics(options)
        trackGoogleAnalytics(options, location)
      }
    })
  }
}

exports.initializeAndTrackGoogleTagManager = (options, location) => {
  if (
    getCookie(options.cookieName) === `true` &&
    validGTMTrackingId(options)
  ) {
    let environmentParamStr = ``
    if (options.gtmAuth && options.gtmPreview) {
      environmentParamStr = `&gtm_auth=${options.gtmAuth}&gtm_preview=${options.gtmPreview}&gtm_cookies_win=x`
    }

    addGoogleTagManager(options, environmentParamStr).then((status) => {
      if (status) {
        initializeGoogleTagManager(options)
        trackGoogleTagManager(options, location)
      }
    })
  }
}

exports.initializeAndTrackFacebookPixel = (options) => {
  if (
    getCookie(options.cookieName) === `true` &&
    validFbPixelId(options)
  ) {
    addFacebookPixel().then((status) => {
      if (status) {
        initializeFacebookPixel(options)
        trackFacebookPixel(options)
      }
    })
  }
}

exports.initializeAndTrackTikTokPixel = (options) => {
  if (
    getCookie(options.cookieName) === `true` &&
    validTikTokPixelId(options)
  ) {
    addTikTokPixel().then((status) => {
      if (status) {
        initializeTikTokPixel(options)
        trackTikTokPixel(options)
      }
    })
  }
}

exports.initializeAndTrackHotjar = (options) => {
  if (
    getCookie(options.cookieName) === `true` &&
    validHotjarId(options)
  ) {
    addHotjar(options).then((status) => {
      if (status) {
        initializeHotjar(options)
        trackHotjar(options)
      }
    })
  }
}

exports.initializeLinkedin = (options) => {
  if (
    getCookie(options.cookieName) === `true` &&
    validLinkedinTrackingId(options)
  ) {
    addLinkedin(options).then((status) => {
      if (status) {
        initializeLinkedin(options)
      }
    })
  }
}

exports.initializeChatwoot = (options) => {
  if (
    getCookie(options.cookieName) === `true` &&
    validChatwootConfig(options)
  ) {
    addChatwoot(options).then((status) => {
      if (status) {
        console.info('Chat is added and running')
      }
    })
  }
}
