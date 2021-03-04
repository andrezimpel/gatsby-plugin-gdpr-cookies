import merge from "lodash/merge"

import { defaultOptions } from "./default-options"
import { initializeAndTrack } from './index'

// init
export const onClientEntry = (_, pluginOptions = {}) => {
  const options = merge(defaultOptions, pluginOptions)
  window.gatsbyPluginGDPRCookiesOptions = options
  window.gatsbyPluginGDPRCookiesGoogleAnalyticsAdded = false
  window.gatsbyPluginGDPRCookiesGoogleTagManagerAdded = false
  window.gatsbyPluginGDPRCookiesFacebookPixelAdded = false

  window.gatsbyPluginGDPRCookiesGoogleAnalyticsInitialized = false
  window.gatsbyPluginGDPRCookiesGoogleTagManagerInitialized = false
  window.gatsbyPluginGDPRCookiesFacebookPixelInitialized = false

  // google tag manager setup
  const { googleTagManager } = pluginOptions

  if (googleTagManager && googleTagManager.defaultDataLayer) {
    googleTagManager.defaultDataLayer = {
      type: typeof googleTagManager.defaultDataLayer,
      value: googleTagManager.defaultDataLayer,
    }

    if (googleTagManager.defaultDataLayer.type === `function`) {
      googleTagManager.defaultDataLayer.value = googleTagManager.defaultDataLayer.value.toString()
    }
  }
}

// track
export const onRouteUpdate = ({ location }) => {
  initializeAndTrack(location)
}
