require('es6-promise').polyfill();
const path = require("path");
const ansiRegex = require('ansi-regex');
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const PuppeteerRenderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = {
  chainWebpack: (config) => {
    config.module.rules.delete('eslint')
  },

  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, "dist"),
        routes: [
          "/login",
        ],
        renderer: new PuppeteerRenderer(),
        minify: {
          caseSensitive: true,
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
          decodeEntities: true,
          minifyCSS: true,
          keepClosingSlash: true,
          sortAttributes: true,
          removeComments: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      })
    ]
  },

  css: {
    loaderOptions: {
      sass: {
        data: `
                @import './src/style/style.scss';
              `
      },
    },
  },

  devServer: {
    port: 5000,
  },

  pwa: {
    name: 'Sprinter',
    themeColor: '#844DFF',
    msTileColor: '#844DFF',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    appleMobileWebAppCapable: 'yes',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
    },
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },

  transpileDependencies: [
    ansiRegex
  ],
}
