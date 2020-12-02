import merge from "lodash/merge"

import defaultOptions from "./default-options"
import { initializePlugin, trackVisit } from './index';

// init

export const onClientEntry = (_, pluginOptions = {}) => {
  const options = merge(defaultOptions, pluginOptions)
  window.gatsbyPluginGDPRCookiesOptions = options;

  initializePlugin(options);
}

// track
export const onRouteUpdate = ({ location }, pluginOptions = {}) => {
  const options = merge(defaultOptions, pluginOptions)
  trackVisit(options, location);
}
