exports.onPreInit = (args, options) => {
  const { googleTagManager } = options;

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
