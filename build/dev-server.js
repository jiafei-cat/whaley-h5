/**
 *  1.检查node和npm的版本、引入相关插件和配置
 *  2.webpack对源码进行编译打包并返回compiler对象
 *  3.创建express服务器
 *  4.配置开发中间件（webpack-dev-middleware）和热重载中间件（webpack-hot-middleware）
 *  5.挂载代理服务和中间件
 *  6.配置静态资源
 *  7.启动服务器监听特定端口（8080）
 *  8.自动打开浏览器并打开特定网址（localhost:8080）
 */

// 检查NodeJS和npm的版本 | 1.检查node和npm的版本
require('./check-versions')()

// opn是一个可以调用默认软件打开网址、图片、文件等内容的插件
// 这里用它来调用默认浏览器打开dev-server监听的端口,例如：localhost:8080
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
// webpack配置
var webpackConfig = require('./webpack.dev.config')
// http-proxy-middleware是一个express中间件,用于将http请求代理到其他服务器
// 例：localhost:8080/api/xxx  -->  localhost:3000/api/xxx
// 这里使用该插件可以将前端开发中涉及到的请求代理到提供服务的后台服务器上,方便与服务器对接
var proxyMiddleware = require('http-proxy-middleware')
// 需要代理的api配置
var proxyTable = {
  // '/goods': {
  //     target: 'http://localhost:3000'
  // }
}
// 端口号
var port = 8080
// 是否自动打开浏览器
var autoOpenBrowse = true
// webpack根据配置开始编译打包源码并返回compiler对象 | 2.执行webpack
var compiler = webpack(webpackConfig)
// 创建express服务器 | 3.创建express服务器
var app = express()
// webpack-dev-middleware将webpack编译打包后得到的产品文件存放在内存中而没有写进磁盘
// 将这个中间件挂到express上使用之后即可提供这些编译后的产品文件服务
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath, // 设置访问路径为webpack配置中的output里面所对应的路径
  quiet: true                                  // 设置为true,使其不要在控制台输出日志
})
// webpack-hot-middleware,用于实现热重载功能的中间件
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,     // 关闭控制台的日志输出
  heartbeat: 2000 // 发送心跳包的频率
})
// webpack(重新)编译打包完成后并将js、css等文件inject到html文件之后，通过热重载中间件强制页面刷新
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})
// 根据 proxyTable 中的代理请求配置来设置express服务器的http代理规则
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  // 格式化options，例如将'www.example.com'变成{ target: 'www.example.com' }
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options)) // (options.filter || '/goods', {target: 'http://localhost:3000'})
})

// 重定向不存在的URL，用于支持SPA（单页应用）
// 例如使用vue-router并开启了history模式
app.use(require('connect-history-api-fallback')())

// 挂载webpack-dev-middleware中间件，提供webpack编译打包后的产品文件服务
app.use(devMiddleware)
// 挂载热重载中间件
app.use(hotMiddleware)
// 提供static文件夹上的静态文件服务
var staticPath = path.posix.join('/', 'static')
app.use(staticPath, express.static('./static'))

// 创建promise，在应用服务启动之后resolve
// 便于外部文件require了这个dev-server之后的代码编写
// var _resolve
// var readyPromise = new Promise(resolve => {
//   _resolve = resolve
// })
console.log('> Starting dev server...')
// webpack-dev-middleware等待webpack完成所有编译打包之后输出提示语到控制台，表明服务正式启动
// 服务正式启动才自动打开浏览器进入页面
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + port + ' \n')
  // when env is testing, don't need open it
  // if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
  // 在浏览器打开这个链接
  opn('http://localhost:' + port)
  // }
  // _resolve()
})

// 启动express服务器并监听相应的端口
var server = app.listen(port)

// 暴露本模块的功能给外部使用，例如下面这种用法
// var devServer = require('./build/dev-server')
// devServer.ready.then(() => {...})
// if (...) { devServer.close() }
// module.exports = {
//   ready: readyPromise,
//   close: () => {
//     server.close()
//   }
// }