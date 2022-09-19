exports.validGATrackingId = (options) =>
  options.trackingId && options.trackingId.trim() !== ``

exports.validGTMTrackingId = (options) =>
  options.trackingId && options.trackingId.trim() !== ``

exports.validFbPixelId = (options) =>
  options.pixelId && options.pixelId.trim() !== ``

exports.validTikTokPixelId = (options) =>
  options.pixelId && options.pixelId.trim() !== ``

exports.validHotjarId = (options) =>
  options.hjid &&
  options.hjid.trim() !== `` &&
  options.hjsv &&
  options.hjsv.trim() !== ``

exports.validChatwootConfig = (options) =>
  options.baseUrl &&
  options.baseUrl.trim() !== `` &&
  options.websiteToken &&
  options.websiteToken.trim() !== ``

exports.validLinkedinTrackingId = (options) =>
  options.trackingId && options.trackingId.trim() !== ``

/**
 * @prop {string} name
 * @returns {boolean}  true if cooke exists and has value === true
 * */
exports.isCookieEnabled = (name) => {
  return document.cookie
    .split(`;`)
    .map((c) => c.trim())
    .includes(`${name}=true`)
}

/**
 * @param {string[]} environments*/
exports.isEnvironmentValid = (environments) => {
  let currentEnvironment = `production`
  try {
    currentEnvironment =
      process?.env?.ENV || process?.env?.NODE_ENV || `development`
  } catch {
    console.warn(`Unable to parse environment. Lets think this is prod anyways`)
  }
  return environments.includes(currentEnvironment)
}
