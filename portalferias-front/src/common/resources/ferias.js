import getBasePath from './api-resource'

const basePath = getBasePath('default', 'ferias')

export default (axios) => {
  return {
    findAll: (params) => axios({ method: 'GET', url: basePath, params }),
    findByFuncionario: (id) => axios({ method: 'GET', url: `${basePath}/funcionario/${id}` }),
    save: (data) => axios({ method: 'POST', url: basePath, data }),
    update: (id, data) => axios({ method: 'PUT', url: `${basePath}/${id}`, data }),
    delete: (id, data) => axios({ method: 'DELETE', url: `${basePath}/${id}` })
  }
}
