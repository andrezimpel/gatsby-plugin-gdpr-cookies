import React from 'react';

import { validFbPixelId } from "./validTrackingId"

const defaultOptions = {
  environments: ['production'],
  googleAnalytics: {
    anonymize: true
  }
};

exports.onRenderBody = ({ setHeadComponents }, pluginOptions = {}) => {
  const currentEnvironment = process.env.ENV || process.env.NODE_ENV || "development";
  const options = Object.assign(defaultOptions, pluginOptions);

  // Add the facebook pixel script to the page only if a valid pixelId is set
  if (options.environments.includes(currentEnvironment) && validFbPixelId(options)) {
    return setHeadComponents([
      <script
        key={`gatsby-plugin-gdpr-cookies`}
        dangerouslySetInnerHTML={{
          __html: `
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
      />,
    ]);
  }
};
