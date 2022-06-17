export const defaultOptions = {
  environments: [`production`],
  googleAnalytics: {
    cookieName: `gatsby-gdpr-google-analytics`,
    anonymize: true,
    allowAdFeatures: false
  },
  googleTagManager: {
    cookieName: `gatsby-gdpr-google-tagmanager`,
    dataLayerName: `dataLayer`,
    routeChangeEvent: `gatsbyRouteChange`
  },
  facebookPixel: {
    cookieName: `gatsby-gdpr-facebook-pixel`
  },
  tikTokPixel: {
    cookieName: `gatsby-gdpr-tiktok-pixel`
  },
  hotjar: {
    cookieName: `gatsby-gdpr-hotjar`
  },
  chatwoot: {
    cookieName: 'gatsby-gdpr-chatwoot'
  },
  linkedin: {
    cookieName: 'gatsby-gdpr-linkedin'
  },
  yandexMetrika: {
    cookieName: 'gatsby-gdpr-yandex-metrika',
    accurateTrackBounce: true,
    childIframe: false,
    clickmap: true,
    defer: false,
    ecommerce: false,
    trackHash: false,
    trackLinks: true,
    trustedDomains: null,
    type: 0,
    webvisor: false,
    triggerEvent: false,
    useCDN: true,
  }
}
