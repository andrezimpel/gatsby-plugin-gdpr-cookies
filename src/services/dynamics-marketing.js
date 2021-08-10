const { 
    validDMId, 
    getCookie 
} = require("../helper")

exports.addDynamicsMarketing = ( options ) => {
  return new Promise((resolve, reject) => {
    if (window.gatsbyPluginGDPRCookiesDynamicsMarketingAdded)
      return resolve(true)

    /* eslint disable */
    const head = document.getElementsByTagName('head')[0]
    const script = document.createElement(`script`)
    script.type = `text/javascript`
    script.src = options.script
    head.appendChild(script);

    const formScript = document.createElement(`script`)
    formScript.type = `text/javascript`
    formScript.src = options.formScript
    head.appendChild(formScript);

    (
      window, 
      document, 
      'script', 
      options.script
    )
    
    /* eslint-enable */

    window.gatsbyPluginGDPRCookiesDynamicsMarketingAdded = true 
    resolve(true)
  });
}

exports.initializeDynamicsMarketing = (options) => {
  if (
    !window.gatsbyPluginGDPRCookiesDynamicsMarketingInitialized && 
    getCookie(options.cookieName) === `true` &&
    validDMId(options)
  ) {
    window.gatsbyPluginGDPRCookiesDynamicsMarketingInitialized = true
   }
}
exports.trackDynamicsMarketing = (options) => {
  // -- 
}