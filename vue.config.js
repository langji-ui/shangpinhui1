const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭 eslint
  lintOnSave: false,
  //...代理跨域
  devServer: {
    proxy: {
      "/api": {
        target: ' http://gmall-h5-api.atguigu.cn',
        // 路径重写  -- 这里代理服务器看到/api 就会工作了  真实的服务器地址也是有/api的
        // pathRewrite: { '^/api': '' },
      },
    },
  },
});
