function page(path) {
    return () => import(/* webpackChunkName: '' */ `~/pages/${path}`).then(m => m.default || m)
  }
  
  export default [
    { path: '/', name: 'welcome', component: page('welcome.vue') },
  
  ]
  