const ansiRegex = require('ansi-regex')

module.exports = {
  chainWebpack: config => {
    config.module.rules.delete('eslint')
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
    workboxOptions: {
      skipWaiting: true,
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
