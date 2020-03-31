module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'api': '@/api',
        'components': '@/components',
        'views': '@/views',
        'store': '@/store',
        'router': '@/router'
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px-to-viewport')({
            viewportWidth: 375,
            viewportHeight: 667,
            unitPrecision: 5,
            viewportUnit: 'vw',
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true
          })
        ]
      }
    }
  }
}