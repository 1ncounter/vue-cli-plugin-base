module.exports = (api, options = {}) => {
  api.chainWebpack(webpackConfig => {
    webpackConfig.module.rules.delete('svg');
    webpackConfig.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(require('path').join(__dirname, '.', 'src/assets/svgs')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
  })
}