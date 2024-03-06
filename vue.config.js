
const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  devServer:{
    proxy:{
        ["/qqApi"]:{
        target:'http://172.20.10.3:3300',
          changeOrigin:true,
            pathRewrite: {
                ['^' + "/qqApi"]: ''
            }
        }
    }

}
})
