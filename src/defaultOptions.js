/* eslint-disable */

export default {
  environments: ["production"],
  googleAnalytics: {
    anonymize: true,
    cookieName: "gatsby-gdpr-google-analytics"
  },
  googleTagManager: {
    cookieName: "gatsby-gdpr-google-tagmanager",
    dataLayerName: "dataLayer",
  },
  facebookPixel: {
    cookieName: "gatsby-gdpr-facebook-pixel"
  }
};
