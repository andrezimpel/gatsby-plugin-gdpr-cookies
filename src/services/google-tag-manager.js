const { validGTMTrackingId, getCookie } = require(`../helper`)

exports.addGoogleTagManager = (
  { trackingId, dataLayerName },
  environmentParamStr
) => {
  return new Promise((resolve, reject) => {
    if (window.gatsbyPluginGDPRCookiesGoogleTagManagerAdded)
      return resolve(true)

    /* eslint-disable */
    !(function (w, d, s, l, i) {
      w[l] = w[l] || []
      w[l].push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      })
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : ""
      j.async = true
      j.src =
        "https://www.googletagmanager.com/gtm.js?id=" +
        i +
        dl +
        environmentParamStr
      f.parentNode.insertBefore(j, f)
    })(window, document, "script", dataLayerName, trackingId)
    /* eslint-enable */

    const iframe = document.createElement(`iframe`)
    iframe.key = `gatsby-plugin-gdpr-cookies-google-tagmanager-iframe`
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${trackingId}${environmentParamStr}`
    iframe.height = 0
    iframe.width = 0
    iframe.style = `display: none; visibility: hidden`

    document.body.insertBefore(iframe, document.body.firstChild)

    window.gatsbyPluginGDPRCookiesGoogleTagManagerAdded = true

    resolve(true)
  })
}

exports.initializeGoogleTagManager = (options) => {
  // console.log(`initing tag manager`)
  if (
    !window.gatsbyPluginGDPRCookiesGoogleTagManagerInitialized &&
    getCookie(options.cookieName) === `true` &&
    validGTMTrackingId(options)
  ) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }
    window.gtag(`js`, new Date())

    let gaAnonymize = options.anonymize
    let gaAllowAdFeatures = options.allowAdFeatures
    gaAnonymize = gaAnonymize !== undefined ? gaAnonymize : true
    gaAllowAdFeatures =
      gaAllowAdFeatures !== undefined ? gaAllowAdFeatures : true

    window.gtag(`config`, options.trackingId, {
      anonymize_ip: gaAnonymize,
      allow_google_signals: gaAllowAdFeatures,
    })
  }
}

exports.trackGoogleTagManager = (options, location) => {
  // console.log(`tracking tag manager`)
  if (
    getCookie(options.cookieName) === `true` &&
    validGTMTrackingId(options) &&
    typeof window.gtag === `function`
  ) {
    const pagePath = location
      ? location.pathname + location.search + location.hash
      : undefined
    window.gtag(`event`, `page_view`, { page_path: pagePath })
  }
  setTimeout(() => {
    const data = options.dataLayerName
      ? window[options.dataLayerName]
      : window.dataLayer

    if (typeof data === `object`) {
      const eventName = options.routeChangeEvent || `gatsbyRouteChange`
      data.push({ event: eventName })
    }
  }, 50)
}
