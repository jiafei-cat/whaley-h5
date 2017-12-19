import App from '@/App'
const routers = [{
  path: '/',
  component: App,
  meta: {
    title: 'seven store'
  },
  children: [
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/pages/home/index'], resolve),
      meta: {
        title: '☼Seven Store☼ - home'
      }
    }, {
      path: '/article',
      name: 'article',
      component: resolve => require(['@/pages/article/index'], resolve),
      meta: {
        title: '☼Seven Store☼ - article'
      }
    }
  ]
}]

export default routers