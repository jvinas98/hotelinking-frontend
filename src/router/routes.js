
const routes = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: 'offers', component: () => import('pages/Index.vue') },
      { path: 'my-offers', component: () => import('pages/UserOffers.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
