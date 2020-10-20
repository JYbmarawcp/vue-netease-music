const WorkboxPlugin = require("workbox-webpack-plugin")

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  outputDir: 'music',
  configureWebpack: {
    devServer: {
      open: true,
      port: 8998,
    },
    externals: isProd ? {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
    } : {},
    plugins: [
      new WorkboxPlugin.GenerateSW()
    ]
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({ // 把px单位换算成rem单位
            rootValue: 14, // 换算的基数(设计图750的根字体为75)
            // selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
            propList: ['*']
          })
        ]
      },
      sass: {
        prependData: `
          @import "@/style/variables.scss";
          @import "@/style/mixin.scss";
        `
      },
    },
  },
};
