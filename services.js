const {
  validGATrackingId,
  validGTMTrackingId,
  validFbPixelId,
  getCookie
} = require('./helper')

const {
  addGoogleAnalytics,
  initializeGoogleAnalytics,
  trackGoogleAnalytics
} = require('./services/google-analytics')

const {
  addGoogleTagManager,
  initializeGoogleTagManager,
  trackGoogleTagManager
} = require('./services/google-tag-manager')

const {
  addFacebookPixel,
  initializeFacebookPixel,
  trackFacebookPixel
} = require('./services/facebook')

exports.initializeAndTrackGoogleAnalytics = (options, location) => {
  if (
    getCookie(options.cookieName) === `true` &&
    validGATrackingId(options)
  ) {
    addGoogleAnalytics(options.trackingId).then((status) => {
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
