exports.validGATrackingId = options =>
  options.trackingId &&
  options.trackingId.trim() !== ``

exports.validGTMTrackingId = options =>
  options.trackingId &&
  options.trackingId.trim() !== ``

exports.validFbPixelId = options =>
  options.pixelId &&
  options.pixelId.trim() !== ``

exports.getCookie = name => {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}
