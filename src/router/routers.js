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
        title: 'home'
      }
    }
  ]
}]

export default routers