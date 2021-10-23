const {
  validChatwootConfig,
  getCookie
} = require('../helper')

exports.addChatwoot = (options) => {
  return new Promise((resolve, reject) => {
    if (window.gatsbyPluginGDPRCookiesChatwootAdded) return resolve(true)

    /* eslint-disable */
    !(function(d,t) {
      var BASE_URL=options.baseUrl;
      var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
      g.src=BASE_URL+"/packs/js/sdk.js";
      g.defer = true;
      g.async = true;
      s.parentNode.insertBefore(g,s);
      g.onload=function(){
        window.chatwootSDK.run({
          websiteToken: options.websiteToken,
          baseUrl: BASE_URL
        })
      }
    })(document,"script")
    /* eslint-enable */

    window.gatsbyPluginGDPRCookiesChatwootAdded = true

    resolve(true)
  })
}
