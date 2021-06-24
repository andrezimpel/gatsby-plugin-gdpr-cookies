const {
  validTikTokPixelId,
  getCookie
} = require('../helper')

exports.addTikTokPixel = () => {
  return new Promise((resolve, reject) => {
    if (window.gatsbyPluginGDPRCookiesTikTokPixelAdded) return resolve(true)

    /* eslint-disable */
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++
    )ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
    }(window, document, 'ttq')
    /* eslint-enable */

    window.gatsbyPluginGDPRCookiesTikTokPixelAdded = true

    resolve(true)
  });
}

exports.initializeTikTokPixel = (options) => {
  if (
    !window.gatsbyPluginGDPRCookiesTikTokPixelInitialized &&
    getCookie(options.cookieName) === `true` &&
    validTikTokPixelId(options)
  ) {
    window.ttq.load(options.pixelId)

    window.gatsbyPluginGDPRCookiesTikTokPixelInitialized = true
  }
}

exports.trackTikTokPixel = (options) => {
  if (
    getCookie(options.cookieName) === `true` &&
    validTikTokPixelId(options) &&
    typeof window.fbq === "function"
  ) {
    window.fbq(`track`, `PageView`)
    window.ttq.page()
  }
}
