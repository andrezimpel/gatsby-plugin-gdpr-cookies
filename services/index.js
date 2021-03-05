var _require = require('../helper'),
    validGATrackingId = _require.validGATrackingId,
    validGTMTrackingId = _require.validGTMTrackingId,
    validFbPixelId = _require.validFbPixelId,
    getCookie = _require.getCookie;

var _require2 = require('./google-analytics'),
    addGoogleAnalytics = _require2.addGoogleAnalytics,
    initializeGoogleAnalytics = _require2.initializeGoogleAnalytics,
    trackGoogleAnalytics = _require2.trackGoogleAnalytics;

var _require3 = require('./google-tag-manager'),
    addGoogleTagManager = _require3.addGoogleTagManager,
    initializeGoogleTagManager = _require3.initializeGoogleTagManager,
    trackGoogleTagManager = _require3.trackGoogleTagManager;

var _require4 = require('./facebook'),
    addFacebookPixel = _require4.addFacebookPixel,
    initializeFacebookPixel = _require4.initializeFacebookPixel,
    trackFacebookPixel = _require4.trackFacebookPixel;

exports.initializeAndTrackGoogleAnalytics = function (options, location) {
  if (getCookie(options.cookieName) === "true" && validGATrackingId(options)) {
    addGoogleAnalytics(options.trackingId).then(function (status) {
      if (status) {
        initializeGoogleAnalytics(options);
        trackGoogleAnalytics(options, location);
      }
    });
  }
};

exports.initializeAndTrackGoogleTagManager = function (options, location) {
  if (getCookie(options.cookieName) === "true" && validGTMTrackingId(options)) {
    var environmentParamStr = "";

    if (options.gtmAuth && options.gtmPreview) {
      environmentParamStr = "&gtm_auth=" + options.gtmAuth + "&gtm_preview=" + options.gtmPreview + "&gtm_cookies_win=x";
    }

    addGoogleTagManager(options, environmentParamStr).then(function (status) {
      if (status) {
        initializeGoogleTagManager(options);
        trackGoogleTagManager(options, location);
      }
    });
  }
};

exports.initializeAndTrackFacebookPixel = function (options) {
  if (getCookie(options.cookieName) === "true" && validFbPixelId(options)) {
    addFacebookPixel().then(function (status) {
      if (status) {
        initializeFacebookPixel(options);
        trackFacebookPixel(options);
      }
    });
  }
};