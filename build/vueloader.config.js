const utils = require('./utils')

module.exports = {
  loaders: utils.cssLoaders({
    // 是否生成map文件
    sourceMap: true,
    // 是否提取css
    extract: false
  }),
  /**
   * 配置文件目录
   * // old
   * <img :default-src="DEFAULT_AVATAR">
   * created () {
   *  this.DEFAULT_AVATAR = require('./assets/default-avatar.png')
   * }
   * // now
   * transformToRequire: {
   *   avatar: ['default-src']
   * }
   */
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}