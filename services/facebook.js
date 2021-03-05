var _require = require('../helper'),
    validFbPixelId = _require.validFbPixelId,
    getCookie = _require.getCookie;

exports.addFacebookPixel = function () {
  return new Promise(function (resolve, reject) {
    if (window.gatsbyPluginGDPRCookiesFacebookPixelAdded) return resolve(true);
    /* eslint-disable */

    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;

      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };

      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */

    window.gatsbyPluginGDPRCookiesFacebookPixelAdded = true;
    resolve(true);
  });
};

exports.initializeFacebookPixel = function (options) {
  if (!window.gatsbyPluginGDPRCookiesFacebookPixelInitialized && getCookie(options.cookieName) === "true" && validFbPixelId(options)) {
    window.fbq("init", options.pixelId);
    window.gatsbyPluginGDPRCookiesFacebookPixelInitialized = true;
  }
};

exports.trackFacebookPixel = function (options) {
  if (getCookie(options.cookieName) === "true" && validFbPixelId(options) && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
};