export const login = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录',
    requireAuth: false, // 添加该字段，表示进入这个路由是需要登录的
  },
  component: () => import('@/views/login/Login')
}

export const phoneLogin = {
  path: '/phoneLogin',
  name: 'phoneLogin',
  meta: {
    title: '登录',
    requireAuth: false,
  },
  component: () => import('@/views/login/PhoneLogin')
}

export const main = {
  path: '/main',
  name: 'main',
  meta: {
    title: '一订有车',
    requireAuth: true,
  },
  component: () => import('@/views/main/main'),
  redirect: 'main/resource',
  children: [{
      path: 'resource',
      component: () => import('@/views/main/resource'),
      meta: {
        requireAuth: true
      },
      children: [{
          path: 'search',
          component: () => import('@/views/resources/search'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'detail',
          component: () => import('@/views/resources/detail'),
          meta: {
            requireAuth: true
          }
        },
      ]
    },
    {
      path: 'quotation',
      component: () => import('@/views/main/quotation'),
      meta: {
        requireAuth: true
      },
      children: [{
        path: 'search',
        component: () => import('@/views/quotation/search'),
        meta: {
          requireAuth: true
        }
      }]
    },
    {
      path: 'order',
      component: () => import('@/views/main/order'),
      meta: {
        requireAuth: true
      },
      children: [{
          path: 'search',
          component: () => import('@/views/orders/search'),
          meta: {
            requireAuth: true
          },
          children: [{
            path: 'searchResult',
            component: () => import('@/views/orders/searchResult'),
            meta: {
              requireAuth: true
            }
          }, ]
        },
        {
          path: 'message',
          component: () => import('@/views/orders/message'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'orderDetail',
          component: () => import('@/views/orders/orderDetail'),
          meta: {
            requireAuth: true
          },
          children: [{
              path: 'orderEmailAddress',
              component: () => import('@/views/orders/orderEmailAddress'),
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'orderMessage',
              component: () => import('@/views/orders/orderMessage'),
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'orderPay',
              component: () => import('@/views/orders/orderPay'),
              meta: {
                requireAuth: true
              },
              children: [{
                path: 'depositReceipt',
                component: () => import('@/views/orders/depositReceipt'),
                meta: {
                  requireAuth: true
                }
              }]
            }
          ]
        }

      ]
    },
    {
      path: 'setting',
      component: () => import('@/views/main/setting'),
      meta: {
        requireAuth: true
      },
      children: [{
          path: 'changePass',
          component: () => import('@/views/settings/changePass'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'companyEmployee',
          component: () => import('@/views/settings/companyEmployee'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'contactCustomer',
          component: () => import('@/views/settings/contactCustomer'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'uArgument',
          component: () => import('@/views/settings/uArgument'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'enterpriseInfo',
          component: () => import('@/views/settings/enterpriseInfo'),
          meta: {
            requireAuth: true
          },
          children: [{
              path: 'address',
              component: () => import('@/views/settings/address'),
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'bankAccount',
              component: () => import('@/views/settings/bankAccount'),
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'landline',
              component: () => import('@/views/settings/landline'),
              meta: {
                requireAuth: true
              }
            }
          ]
        },
        {
          path: 'personInfo',
          component: () => import('@/views/settings/personInfo'),
          meta: {
            requireAuth: true
          },
          children: [{
              path: 'sex',
              component: () => import('@/views/settings/userSex'),
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'personName',
              component: () => import('@/views/settings/personName'),
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'personPhoto',
              component: () => import('@/views/settings/personPhoto'),
              meta: {
                requireAuth: true
              }
            },

          ]
        },
        {
          path: 'aboutUs',
          component: () => import('@/views/settings/aboutUs'),
          meta: {
            requireAuth: true
          }
        },
      ]
    }
  ]
}

export const routers = [
  login,
  phoneLogin,
  main

]
