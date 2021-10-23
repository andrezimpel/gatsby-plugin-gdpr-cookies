exports.validGATrackingId = options =>
  options.trackingId &&
  options.trackingId.trim() !== ``

exports.validGTMTrackingId = options =>
  options.trackingId &&
  options.trackingId.trim() !== ``

exports.validFbPixelId = options =>
  options.pixelId &&
  options.pixelId.trim() !== ``

exports.validTikTokPixelId = options =>
  options.pixelId &&
  options.pixelId.trim() !== ``

exports.validHotjarId = options =>
  options.hjid &&
  options.hjid.trim() !== `` &&
  options.hjsv &&
  options.hjsv.trim() !== ``

exports.validDMId = options => 
  options.id &&
  options.id.trim() !== `` &&
  options.websiteId && 
  options.websiteId.trim() !== ``

exports.getCookie = name => {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

exports.isEnvironmentValid = (environments) => {
  const currentEnvironment = process.env.ENV || process.env.NODE_ENV || `development`
  return environments.includes(currentEnvironment)
}
