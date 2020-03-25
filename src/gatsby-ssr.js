import React from "react"
import { oneLine, stripIndent } from "common-tags"
import merge from "lodash/merge"

import { validFbPixelId, validGTMTrackingId } from "./valid-tracking-id"
import defaultOptions from "./default-options"

const generateGTM = (id, dataLayerName, environmentParamStr) => stripIndent`
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl+'${environmentParamStr}';f.parentNode.insertBefore(j,f);
  })(window,document,'script','${dataLayerName}', '${id}');`

const generateGTMIframe = (id, environmentParamStr) =>
  oneLine`<iframe src="https://www.googletagmanager.com/ns.html?id=${id}${environmentParamStr}" height="0" width="0" style="display: none; visibility: hidden"></iframe>`

const generateGTMDefaultDataLayer = (dataLayer, dataLayerName, reporter) => {
  let result = `window.${dataLayerName} = window.${dataLayerName} || [];`

  if (dataLayer.type === `function`) {
    result += `window.${dataLayerName}.push((${dataLayer.value})());`
  } else {
    if (dataLayer.type !== `object` || dataLayer.value.constructor !== Object) {
      reporter.panic(
        `Oops the plugin option "defaultDataLayer" should be a plain object. "${dataLayer}" is not valid.`
      )
    }
    result += `window.${dataLayerName}.push(${JSON.stringify(
      dataLayer.value
    )});`
  }

  return stripIndent`${result}`
}

// add scripts

exports.onRenderBody = (
  { setHeadComponents, setPreBodyComponents, reporter },
  pluginOptions = {}
) => {
  const currentEnvironment =
    process.env.ENV || process.env.NODE_ENV || `development`
  const options = merge(defaultOptions, pluginOptions)
  const headComponents = []
  const preBodyComponents = []

  // facebook pixel
  if (
    options.environments.includes(currentEnvironment) &&
    validFbPixelId(options)
  ) {
    headComponents.push(
      <script
        key="gatsby-plugin-gdpr-cookies-google-analytics"
        dangerouslySetInnerHTML={{
          __html: stripIndent`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
          `,
        }}
      />
    )
  }

  // google tag manager
  if (
    options.environments.includes(currentEnvironment) &&
    validGTMTrackingId(options)
  ) {
    const { googleTagManager } = options

    let environmentParamStr = ``
    if (googleTagManager.gtmAuth && googleTagManager.gtmPreview) {
      environmentParamStr = oneLine`
        &gtm_auth=${googleTagManager.gtmAuth}&gtm_preview=${googleTagManager.gtmPreview}&gtm_cookies_win=x
      `
    }

    let defaultDataLayerCode = ``
    if (googleTagManager.defaultDataLayer) {
      defaultDataLayerCode = generateGTMDefaultDataLayer(
        googleTagManager.defaultDataLayer,
        googleTagManager.dataLayerName,
        reporter
      )
    }

    headComponents.push(
      <script
        key="gatsby-plugin-gdpr-cookies-google-tagmanager"
        dangerouslySetInnerHTML={{
          __html: oneLine`
            ${defaultDataLayerCode}
            ${generateGTM(
              googleTagManager.trackingId,
              googleTagManager.dataLayerName,
              environmentParamStr
            )}
          `,
        }}
      />
    )

    preBodyComponents.push(
      <noscript
        key="gatsby-plugin-gdpr-cookies-google-tagmanager"
        dangerouslySetInnerHTML={{
          __html: generateGTMIframe(
            googleTagManager.trackingId,
            environmentParamStr
          ),
        }}
      />
    )
  }

  // add scripts

  if (headComponents.length) {
    setHeadComponents(headComponents)
  }

  if (preBodyComponents.length) {
    setPreBodyComponents(preBodyComponents)
  }
}
