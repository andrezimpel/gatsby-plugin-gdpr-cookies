const {
  validLinkedinTrackingId,
  getCookie
} = require('../helper')

exports.addLinkedin = (options) => {
  return new Promise((resolve, reject) => {
    if (window.gatsbyPluginGDPRCookiesLinkedinAdded) return resolve(true)

    /* eslint-disable */
      // LINKED IN SPECIFIC CODE HERE
      _linkedin_partner_id = options.trackingId;
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; 
      window._linkedin_data_partner_ids.push(_linkedin_partner_id); 
    /* eslint-enable */

    window.gatsbyPluginGDPRCookiesLinkedinAdded = true

    resolve(true)
  })
}

exports.initializeLinkedin = (options) => {
  if (
    !window.gatsbyPluginGDPRCookiesLinkedinInitialized &&
    getCookie(options.cookieName) === `true` &&
    validLinkedinTrackingId(options)
  ) {
    // (function(){
      var s = document.getElementsByTagName("script")[0]; 
      var b = document.createElement("script"); 
      b.type = "text/javascript";
      b.async = true; 
      b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; 
      s.parentNode.insertBefore(b, s);
    // })();

    window.gatsbyPluginGDPRCookiesLinkedinInitialized = true
  }
}