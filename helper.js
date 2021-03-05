exports.validGATrackingId = function (options) {
  return options.trackingId && options.trackingId.trim() !== "";
};

exports.validGTMTrackingId = function (options) {
  return options.trackingId && options.trackingId.trim() !== "";
};

exports.validFbPixelId = function (options) {
  return options.pixelId && options.pixelId.trim() !== "";
};

exports.getCookie = function (name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
};