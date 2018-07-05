function routingFlow () {
  return 'index_manager'
}

export default [
  {
    path: '',
    name: 'root',
    component: () => import('components/Root'),
    redirect: to => {
      return { name: routingFlow() }
    },
    children: [
      {
        path: '/manager',
        name: 'index_manager',
        component: () => import('components/IndexManager'),
        children: [
          {
            path: '/cargo',
            component: () => import('components/Cargo')
          },
          {
            path: '/evento',
            name: 'evento',
            component: () => import('components/Evento')
          },
          {
            path: '/funcionario',
            name: 'funcionario',
            component: () => import('components/Funcionario')
          },
          {
            path: '/funcionarioevento',
            name: 'funcionarioEvento',
            component: () => import('components/FuncionarioEvento')
          },
          {
            path: '/ferias',
            name: 'ferias',
            component: () => import('components/Ferias')
          },
          {
            path: '/gozoferias',
            name: 'gozoferias',
            component: () => import('components/GozoFerias')
          }
        ]
      }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('components/pages/404')
  }
]
