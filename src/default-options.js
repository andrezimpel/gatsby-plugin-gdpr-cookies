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
  dynamicsMarketing: {
    cookieName: `gatsby-gdpr-dynamics-marketing`, 
    className: `d365-mkt-config hidden`
  }
}
