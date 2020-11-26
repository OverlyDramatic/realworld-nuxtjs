module.exports = {
  loading: {
    color: '#C6F6D5'
  },
  router: {
    linkExactActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // ! 清楚默认路由项
      routes.splice(0)
      // * 添加路由
      routes.push(...[{
        // name: 'layout',
        path: '/',
        component: resolve(__dirname, 'pages/layout/'),
        children: [
          {
            name: 'home',
            path: '', // 默认子路由
            component: resolve(__dirname, 'pages/home/'),
          },
          {
            name: 'login',
            path: '/login',
            component: resolve(__dirname, 'pages/login/'),
          },
          {
            name: 'register',
            path: '/register',
            component: resolve(__dirname, 'pages/login/'),
          },
          {
            name: 'profile',
            path: '/profile/:username',
            component: resolve(__dirname, 'pages/profile/'),
          },
          {
            name: 'setting',
            path: '/setting',
            component: resolve(__dirname, 'pages/setting/'),
          },
          {
            name: 'editor',
            path: '/editor',
            component: resolve(__dirname, 'pages/editor/'),
          },
          {
            name: 'article',
            path: '/article/:slug',
            component: resolve(__dirname, 'pages/article/'),
          },
        ]
      }])
    }
  }
}