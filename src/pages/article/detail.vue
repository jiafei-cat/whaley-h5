<template>
  <div class="seven-article">
    <div class="seven-article-detail">
        <div class="left-content">
            <div class="left-title"><h1>{{title}}</h1></div>
            <div class="article-info">
              <div class="day">20天前</div>
              <div class="reads">阅读数: 30</div>
              <div class="comment">评论数: 0</div>
            </div>
            <div class="left-article markdown-body" v-html="article"></div>
        </div>
        <div class="right-content">
          <div class="recently">
            <div class="title">recent</div>
            <div class="list">
              <ul class="recently-list">
                <li v-for="item in recentlyList" :key="item.title"><router-link to="/article/detail"><p class="ellipsis">{{item.title}}</p><span>({{ item.reads }})</span></router-link></li>
              </ul>
            </div>
          </div>
          <div class="tags">
            <div class="title">Tags</div>
            <div class="list">
                <ul class="tags-list">
                  <li v-for="item in tags" :key="item.title"><router-link to="/article/detail">{{ item.title + '('+ item.num +')'}}</router-link></li>
                </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import marked from 'marked'
export default {
  data () {
    return {
      title: '关于组件库的主题定制',
      recentlyList: [
        {
          'title': 'Understanding JavaScript Bind ()',
          'reads': '12'
        }, {
          'title': '关于组件库的主题定制',
          'reads': '31'
        }, {
          'title': '关于Babel你只需要知道三个插件',
          'reads': '44'
        }, {
          'title': 'hbs使用最佳实践',
          'reads': '11'
        }, {
          'title': 'Handlebars学习记录',
          'reads': '6'
        }
      ],
      tags: [
        {
          'title': '随笔',
          'num': 13
        }, {
          'title': 'JS',
          'num': 13
        }, {
          'title': 'VUE',
          'num': 13
        }, {
          'title': '性能优化',
          'num': 13
        }, {
          'title': 'HTML',
          'num': 13
        }, {
          'title': 'Angualrjs',
          'num': 13
        }, {
          'title': '后端基础',
          'num': 13
        }
      ],
      article: "<h3 id=\"-\">简述</h3>\n<p>这篇博文主要讲解<strong>前端组件库主题定制</strong>相关内容，只限于<strong>Scss/Sass、Less</strong>两种样式预处理语言，这两种语言能够简化CSS的工作流，使得开发者维护开发样式更得心应手，便于应对复杂的样式需求。</p>\n<p>对组件封装性好的库而我比较熟悉的有两个，React和Vue，这里我对这两个前端库封装的组件进行说明，涉及到的组件库包括：<a href=\"http://element-cn.eleme.io\">element-ui</a>、<a href=\"https://www.iviewui.com/\">iview</a>、<a href=\"https://ant.design\">antd</a>、<a href=\"https://github.com/ionic-team/ionic\">ionic</a>。</p>\n<h3 id=\"-\">主题定制分类</h3>\n<p>组件库的编写者一般都会为开发者设计一些主题样式更换方案，主要是这两类：</p>\n<ol>\n<li>复写全部主题样式，一次性引入</li>\n<li>通过预处理器注入主题变量</li>\n</ol>\n<p>这里对这两类进行说明。</p>\n<h4 id=\"1-\">1. 复写全部主题样式</h4>\n<h5 id=\"scss\">SCSS</h5>\n<p>这个在PC端比较常见，比如：<a href=\"http://element-cn.eleme.io/#/zh-CN/component/custom-theme\">element-ui</a>中的第二个方案，虽然说是改变SCSS变量，但还是复写了全部主题样式。项目初始时加载全部组件的样式，这个场景在PC端并没有太大的问题。但是从性能优化的角度，并不推荐。</p>\n<pre><code class=\"lang-scss\">/* 改变主题色变量 *<span class=\"hljs-regexp\">/\n$--color-primary: teal;\n\n/</span>* 改变 icon 字体路径变量，必需 *<span class=\"hljs-regexp\">/\n$--font-path: '../node</span>_modules/element-ui/<span class=\"hljs-class\"><span class=\"hljs-keyword\">lib</span>/<span class=\"hljs-title\">theme</span>-<span class=\"hljs-title\">chalk</span>/<span class=\"hljs-title\">fonts</span>';</span>\n\n@import <span class=\"hljs-string\">\"../node_modules/element-ui/packages/theme-chalk/src/index\"</span>;\n</code></pre>\n<h5 id=\"less\">Less</h5>\n<p>此外，<a href=\"https://www.iviewui.com/docs/guide/theme\">iview</a>使用Less作为预编译语言，给出的推荐主题定制方案全部都是复写全部主题样式的解决办法，和element-ui一致。</p>\n<pre><code class=\"lang-less\"><span class=\"hljs-keyword\">@import</span> <span class=\"hljs-string\">'~iview/src/styles/index.less'</span>;\n\n<span class=\"hljs-comment\">// Here are the variables to cover, such as:</span>\n<span class=\"hljs-variable\">@primary-color:</span> <span class=\"hljs-number\">#8c0776</span>;\n</code></pre>\n<blockquote>\n<p>因为Less和Scss变量作用域定义不一样，上面两个<code>@import</code>写法会有些不同，但都是一个意思。</p>\n</blockquote>\n<p>需要注意的是，这种方式已经载入了所有组件的样式，不需要也无法和按需加载插件<a href=\"https://www.npmjs.com/package/babel-plugin-import\">babel-plugin-import</a>或<a href=\"https://www.npmjs.com/package/babel-plugin-component\">babel-plugin-component</a>的 style 属性一起使用。</p>\n<h4 id=\"2-\">2.  通过预处理器注入主题变量</h4>\n<h5 id=\"less\">Less</h5>\n<p>这里值得一提的是Antd组件库，这是我强烈推荐使用的组件库。它推荐使用<a href=\"https://ant.design/docs/react/customize-theme-cn\">修改主题变量</a>的方式定制主题，使用了Less的 <a href=\"http://lesscss.org/usage/#using-less-in-the-browser-modify-variables\"><strong>modifyVars</strong></a> 的方式来覆盖主题变量。比如将主题挂在<code>package.json</code>上：</p>\n<pre><code class=\"lang-json\"><span class=\"hljs-string\">\"theme\"</span>: {\n  <span class=\"hljs-string\">\"primary-color\"</span>: <span class=\"hljs-string\">\"#1DA57A\"</span>,\n},\n</code></pre>\n<p>这个方案之前在我做的项目中有使用，自己根据实现原理写逻辑代码不是很难。</p>\n<p>问题点是：每次修改变量都需要重启dev服务，刚开始对开发者不是很友好。当然，主题修改好后，并不是经常变动，这里可以原谅。</p>\n<h5 id=\"scss\">SCSS</h5>\n<p>其实SCSS也能通过<strong>只修改主题变量</strong>的方式更改主题，这个是在读IONIC源码时发现的，<a href=\"https://github.com/ionic-team/ionic-app-scripts/blob/427e556460265da817a5975567ded2a00e5cb8bd/src/sass.ts#L137\">源码位置</a>。它是通过<a href=\"https://github.com/sass/node-sass\">node-sass</a>的<a href=\"https://github.com/sass/node-sass#data\"><strong>options.data</strong></a>的方式覆盖主题。比如传入如下字符串：</p>\n<pre><code class=\"lang-scss\">'<span class=\"hljs-meta\">@charset</span> <span class=\"hljs-string\">\"UTF-8\"</span>; <span class=\"hljs-meta\">@import</span> <span class=\"hljs-string\">\"/xxx/xxx/project/to/theme/path/variables.scss\"</span>;'\n</code></pre>\n<p>构建时启用你定义的样式变量。我这里简单写了一个变量获取方式，<a href=\"https://github.com/vm-component/vimo/blob/master/examples/build/get-scss-variables.js\">代码</a>。</p>\n<p>注意，这里需要你样式组件中的所有变量后都带上<code>!default</code>修饰，将生效等级降为最低。这里没有Less那样需要重启dev-server的问题，通过webpack构建，修改了引入的主题文件，项目将自动重构，较为方便。</p>\n<h3 id=\"-\">总结</h3>\n<p>建议通过修改变量的方式来修改主题我认为是比较靠谱的，当主题与公司UI不符时，再使用样式复写的方式处理。</p>\n<blockquote>\n<p>个人还是比较喜欢SCSS的处理方式。</p>\n</blockquote>\n"
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/mixin';
.seven-article-detail{
  @include fj;
  padding: 0 10%;
  .left-content{
    box-shadow: 0 15px 30px rgba(0,0,0,0.4);
    flex: 5;
    text-align: left;
    .left-title,.left-article{
      padding: 20px;
      background: #fff;
    }
    .article-info{
      color: #eee;
      padding: 10px 20px;
      background: rgba(255, 255, 255, .2);
      @include fj(flex-end);
      div{
        color: inherit;
        margin-left: 20px;
      }
    }
  }
  .right-content{
    margin-left: 4%;
    width: 300px;
    .title,.list{
      padding: 10px;
    }
    .title{
      background: rgba(255, 255, 255, .2);
      text-transform: uppercase;
      color: rgb(159, 252, 236);
    }
    .list{
      background: #fff;
    }
    .recently{
      position: fixed;
      box-shadow: 0 15px 30px rgba(0,0,0,0.4);
    }
    .tags{
      position: fixed;
      top: 280px;      
      box-shadow: 0 15px 30px rgba(0,0,0,0.4);
      margin-top: 20px;
    }
    .tags-list{
      @include fj(flex-start);
      flex-wrap: wrap;
      li{
        padding: 4px 8px;
        margin: 2px 4px;
        margin-right:0;
        border: 1px solid #eee;
        transition: all .6s;
        a{
          transition: all .6s;
        }
        &:hover{
          border-color:rgb(159, 252, 236);
          a{
            color: rgb(159, 252, 236);
          }
        }
      }
    }
    .recently-list{
      li{
        position: relative;
        padding-left: 10px;
        border-left: 3px solid rgb(159, 252, 236);
        margin: 6px 0;
        a{
          @include fj(flex-start);
        }
        p{
          transition: all .6s;
        }
        span{
          margin-left: 6px;
        }
        &:hover{
          p{
            color: rgb(159, 252, 236);
          }
        }
      }
    }
  }
}
</style>
