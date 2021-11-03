import { defaultOptions } from "./default-options"
import { initializeAndTrack } from './index'
import merge from "lodash/merge"

// init
export const onClientEntry = (_, pluginOptions = {}) => {
  window.gatsbyPluginGDPRCookiesGoogleAnalyticsAdded = false
  window.gatsbyPluginGDPRCookiesGoogleTagManagerAdded = false
  window.gatsbyPluginGDPRCookiesFacebookPixelAdded = false
  window.gatsbyPluginGDPRCookiesTikTokPixelAdded = false
  window.gatsbyPluginGDPRCookiesHotjarAdded = false
  window.gatsbyPluginGDPRCookiesChatwootAdded = false
  window.gatsbyPluginGDPRCookiesLinkedinAdded = false

  window.gatsbyPluginGDPRCookiesGoogleAnalyticsInitialized = false
  window.gatsbyPluginGDPRCookiesGoogleTagManagerInitialized = false
  window.gatsbyPluginGDPRCookiesFacebookPixelInitialized = false
  window.gatsbyPluginGDPRCookiesTikTokPixelInitialized = false
  window.gatsbyPluginGDPRCookiesHotjarInitialized = false
  window.gatsbyPluginGDPRCookiesLinkedinInitialized = false

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

  const options = merge(defaultOptions, pluginOptions)
  window.gatsbyPluginGDPRCookiesOptions = options
}

// track
export const onRouteUpdate = ({ location }) => {
  initializeAndTrack(location)
}
