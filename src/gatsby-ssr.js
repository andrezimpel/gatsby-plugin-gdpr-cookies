import React from "react";
import { oneLine, stripIndent } from "common-tags";

import { validFbPixelId, validGTMTrackingId } from "./validTrackingId";
import defaultOptions from "./defaultOptions";

const generateGTM = (id, environmentParamStr, dataLayerName) => stripIndent`
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl+'${environmentParamStr}';f.parentNode.insertBefore(j,f);
  })(window,document,'script','${dataLayerName}', '${id}');`

const generateGTMIframe = (id, environmentParamStr) =>
  oneLine`<iframe src="https://www.googletagmanager.com/ns.html?id=${id}${environmentParamStr}" height="0" width="0" style="display: none; visibility: hidden"></iframe>`

const generateGTMDefaultDataLayer = (dataLayer, reporter, dataLayerName) => {
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

exports.onRenderBody = ({ setHeadComponents, setPreBodyComponents, reporter }, pluginOptions = {}) => {
  const currentEnvironment = process.env.ENV || process.env.NODE_ENV || "development";
  const options = Object.assign(defaultOptions, pluginOptions);
  const headComponents = []
  const preBodyComponents = []

  // Add the facebook pixel script to the page only if a valid pixelId is set
  if (options.environments.includes(currentEnvironment) && validFbPixelId(options)) {
    headComponents.push(
      <script
        key="gatsby-plugin-gdpr-cookies-google-analytics"
        dangerouslySetInnerHTML={{
          __html: oneLine`
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
    );
  }

  // Add google tag manager script
  if (options.environments.includes(currentEnvironment) && validGTMTrackingId(options)) {
    const environmentParamStr =
      options.googleTagManager.gtmAuth && options.googleTagManager.gtmPreview
        ? oneLine`&gtm_auth=${options.googleTagManager.gtmAuth}&gtm_preview=${options.googleTagManager.gtmPreview}&gtm_cookies_win=x`
        : ``

    let defaultDataLayerCode = ``
    if (options.googleTagManager.defaultDataLayer) {
      defaultDataLayerCode = generateGTMDefaultDataLayer(
        options.googleTagManager.defaultDataLayer,
        reporter,
        options.googleTagManager.dataLayerName
      )
    }

    headComponents.push(
      <script
        key="gatsby-plugin-gdpr-cookies-google-tagmanager"
        dangerouslySetInnerHTML={{
          __html: oneLine`
            ${defaultDataLayerCode}
            ${generateGTM(
              options.googleTagManager.trackingId,
              environmentParamStr,
              options.googleTagManager.dataLayerName
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
            options.googleTagManager.trackingId,
            environmentParamStr
          ),
        }}
      />
    )
  }

  if(headComponents.length) {
    setHeadComponents(headComponents);
  }

  if(preBodyComponents.length) {
    setPreBodyComponents(preBodyComponents);
  }
};
