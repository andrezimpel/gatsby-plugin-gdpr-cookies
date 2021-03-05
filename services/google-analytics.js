var _require = require('../helper'),
    validGATrackingId = _require.validGATrackingId,
    getCookie = _require.getCookie;

exports.addGoogleAnalytics = function (_ref) {
  var trackingId = _ref.trackingId;
  return new Promise(function (resolve, reject) {
    if (window.gatsbyPluginGDPRCookiesGoogleAnalyticsAdded) return resolve(true);
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement("script");
    script.type = "text/javascript";

    script.onload = function () {
      window.gatsbyPluginGDPRCookiesGoogleAnalyticsAdded = true;
      resolve(true);
    };

    script.src = "https://www.googletagmanager.com/gtag/js?id=" + trackingId;
    head.appendChild(script);
  });
};

exports.initializeGoogleAnalytics = function (options) {
  if (!window.gatsbyPluginGDPRCookiesGoogleAnalyticsInitialized && getCookie(options.cookieName) === "true" && validGATrackingId(options)) {
    window.dataLayer = window.dataLayer || [];

    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    var gaAnonymize = options.anonymize;
    var gaAllowAdFeatures = options.allowAdFeatures;
    gaAnonymize = gaAnonymize !== undefined ? gaAnonymize : true;
    gaAllowAdFeatures = gaAllowAdFeatures !== undefined ? gaAllowAdFeatures : true;
    window.gtag('config', options.trackingId, {
      'anonymize_ip': gaAnonymize,
      'allow_google_signals': gaAllowAdFeatures
    });
    window.gatsbyPluginGDPRCookiesGoogleAnalyticsInitialized = true;
  }
};

exports.trackGoogleAnalytics = function (options, location) {
  if (getCookie(options.cookieName) === "true" && validGATrackingId(options) && typeof window.gtag === "function") {
    var pagePath = location ? location.pathname + location.search + location.hash : undefined;
    window.gtag("event", "page_view", {
      page_path: pagePath
    });
  }
};