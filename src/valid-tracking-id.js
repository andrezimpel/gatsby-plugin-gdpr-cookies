export const validGATrackingId = options =>
  options.googleAnalytics &&
  options.googleAnalytics.trackingId &&
  options.googleAnalytics.trackingId.trim() !== ``

export const validGTMTrackingId = options =>
  options.googleTagManager &&
  options.googleTagManager.trackingId &&
  options.googleTagManager.trackingId.trim() !== ``

export const validFbPixelId = options =>
  options.facebookPixel &&
  options.facebookPixel.pixelId &&
  options.facebookPixel.pixelId.trim() !== ``
