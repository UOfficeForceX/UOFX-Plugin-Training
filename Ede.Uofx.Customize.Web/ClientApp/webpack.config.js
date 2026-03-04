const initUofxPluginWebpack = require('@uofx/plugin/scripts/initial-webpack');
module.exports = initUofxPluginWebpack({
    production: false,
    usePort: 40001
});
