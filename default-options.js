Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = void 0;
var defaultOptions = {
  environments: ["production"],
  googleAnalytics: {
    cookieName: "gatsby-gdpr-google-analytics",
    anonymize: true,
    allowAdFeatures: false
  },
  googleTagManager: {
    cookieName: "gatsby-gdpr-google-tagmanager",
    dataLayerName: "dataLayer",
    routeChangeEvent: "gatsbyRouteChange"
  },
  facebookPixel: {
    cookieName: "gatsby-gdpr-facebook-pixel"
  }
};
exports.defaultOptions = defaultOptions;