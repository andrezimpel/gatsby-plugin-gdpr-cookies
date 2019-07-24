import ReactGA from 'react-ga';

import Cookies from 'universal-cookie';

export const onClientEntry = (undefined, pluginOptions = {}) => {
  const cookies = new Cookies();
  const googleAnalyticsTrackingId = pluginOptions.googleAnalytics.trackingId;
  console.log(cookies);

  console.log(cookies.get('cookie-analysis-acknowledged'));

  // setup analytics
  ReactGA.initialize(googleAnalyticsTrackingId);

  window.fbq('init', '427433987845846');
}

export const onRouteUpdate = ({ location }, pluginOptions = {}) => {

  // ga tracking
  ReactGA.set({ page: location.pathname, anonymizeIp: pluginOptions.googleAnalytics.anonymize });
  ReactGA.pageview(location.pathname);



  window.fbq('track', 'PageView');
}
