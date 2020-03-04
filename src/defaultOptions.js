export default {
  environments: ["production"],
  googleAnalytics: {
    cookieName: "gatsby-gdpr-google-analytics",
    anonymize: true,
  },
  googleTagManager: {
    cookieName: "gatsby-gdpr-google-tagmanager",
    dataLayerName: "dataLayer",
  },
  facebookPixel: {
    cookieName: "gatsby-gdpr-facebook-pixel",
  },
};
