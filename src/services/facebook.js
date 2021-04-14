const {
  validFbPixelId,
  getCookie
} = require('../helper')

exports.addFacebookPixel = () => {
  return new Promise((resolve, reject) => {
    if (window.gatsbyPluginGDPRCookiesFacebookPixelAdded) return resolve(true)

    /* eslint-disable */
    !(function(f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function() {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = !0
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js',
    )
    /* eslint-enable */

    window.gatsbyPluginGDPRCookiesFacebookPixelAdded = true

    resolve(true)
  });
}

exports.initializeFacebookPixel = (options) => {
  if (
    !window.gatsbyPluginGDPRCookiesFacebookPixelInitialized &&
    getCookie(options.cookieName) === `true` &&
    validFbPixelId(options)
  ) {
    window.fbq(`init`, options.pixelId)

    window.gatsbyPluginGDPRCookiesFacebookPixelInitialized = true
  }
}

exports.trackFacebookPixel = (options) => {
  if (
    getCookie(options.cookieName) === `true` &&
    validFbPixelId(options) &&
    typeof window.fbq === "function"
  ) {
    window.fbq(`track`, `PageView`)
  }
}
