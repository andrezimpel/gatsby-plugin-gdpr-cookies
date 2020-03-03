exports.onPreInit = (args, options) => {
  if (options.googleTagManager && options.googleTagManager.defaultDataLayer) {
    options.googleTagManager.defaultDataLayer = {
      type: typeof options.googleTagManager.defaultDataLayer,
      value: options.googleTagManager.defaultDataLayer,
    }

    if (options.googleTagManager.defaultDataLayer.type === `function`) {
      options.googleTagManager.defaultDataLayer.value = options.googleTagManager.defaultDataLayer.value.toString()
    }
  }
}
