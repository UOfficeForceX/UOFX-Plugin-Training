const proxyUrl = process.env.ANGULAR_SPA_PROXY_URL;
let port = 40001;
if (proxyUrl) {
    try {
        const url = new URL(proxyUrl);
        port = parseInt(url.port, 10) || 40001;
    } catch (e) {
        console.warn('Invalid ANGULAR_SPA_PROXY_URL, using default port 40001');
    }
}
console.log('Webpack dev server port:', port);

const initUofxPluginWebpack = require('@uofx/plugin/scripts/initial-webpack');
module.exports = initUofxPluginWebpack({
    production: false,
    usePort: port
});
