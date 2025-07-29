const { showIncompatiblePluginDialog } = require('@sanity/incompatible-plugin');
const { name, version, sanityExchangeUrl } = require('./package.json');

export default showIncompatiblePluginDialog({
  name: name,
  versions: {
    v4: version,
    v3: version,
    v2: undefined,
  },
  sanityExchangeUrl,
});
