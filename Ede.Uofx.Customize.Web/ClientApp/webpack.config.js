const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const webpack = require('webpack');
const path = require("path");
const manifest = require("./src/plugin.manifest.json");
const exposes = require("./webpack-exposes.config");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, './tsconfig.json'),
  [/* mapped paths to share */]);

const sharedAngular = {
  "@angular/core": { singleton: true, requiredVersion: '^17.3.11' },
  "@angular/common": { singleton: true, requiredVersion: '^17.3.11' },
  "@angular/common/http": { singleton: true, requiredVersion: '^17.3.11' },
  "@angular/forms": { singleton: true, requiredVersion: '^17.3.11' },
  "@angular/router": { singleton: true, requiredVersion: '^17.3.11' },
};

const sharedThird = {
  "@ngx-translate/core": { singleton: true, requiredVersion: '^15.0.0' },
  "@ngx-translate/http-loader": { singleton: true, requiredVersion: '^8.0.0' },
  "primeng": { singleton: true, strictVersion: false, requiredVersion: 'auto' },
  "primeng/api": { singleton: true, strictVersion: false, requiredVersion: 'auto' },
  "primeng/utils": { singleton: true, strictVersion: false, requiredVersion: 'auto' },
};

const sharedThirdForApp = {
  "@ionic/angular": { singleton: true, strictVersion: false, requiredVersion: '8.2.2' }
};

const sharedUofxLibraries = {
  "@uofx/icon": { singleton: true, requiredVersion: '^1.0.0' },
  "@uofx/core": { singleton: true, requiredVersion: '^2.0.0' },
  '@uofx/core/interceptor': { singleton: true, requiredVersion: '^2.0.0' },
};

module.exports = {
  output: {
    uniqueName: "sample",
    publicPath: "auto",
    scriptType: 'text/javascript'
  },
  optimization: {
    runtimeChunk: false
  },
  devServer: {
    allowedHosts: 'all',
    client: {
      webSocketURL: 'ws://localhost:40001/ng-cli-ws',
    }
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  plugins: [
    // DISABLE ngDevMode as it is not needed in a remoteEntry
    new webpack.DefinePlugin({
      ngDevMode: 'undefined',
    }),
    
    // Web
    new ModuleFederationPlugin({
      name: manifest.code.replaceAll('.', '_'),
      filename: "remoteEntry.js",
      exposes: exposes.web,
      shared: {
        ...sharedAngular,
        ...sharedThird,
        ...sharedUofxLibraries,

        ...sharedMappings.getDescriptors()
      }
    }),
    // App
    new ModuleFederationPlugin({
      name: manifest.code.replaceAll('.', '_') + '_App',
      filename: "remoteEntryApp.js",
      exposes: exposes.app,
      shared: {
        ...sharedAngular,
        ...sharedThird,
        ...sharedThirdForApp,
        ...sharedUofxLibraries,

        "@uofx/app-native": { singleton: true, strictVersion: false, requiredVersion: '^1.1.3' },

        ...sharedMappings.getDescriptors()
      }
    }),
    sharedMappings.getPlugin()
  ],
};
