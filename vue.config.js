module.exports = {
  devServer: {
    // 浏览器自动打开
    open: true,
    // 配置反向代理
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
        secure: true
      }
    }
  }
}
