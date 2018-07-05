import getBasePath from './api-resource'

const basePath = getBasePath('default', 'gozoferias')

export default (axios) => {
  return {
    findAll: (params) => axios({ method: 'GET', url: basePath, params }),
    save: (data) => axios({ method: 'POST', url: basePath, data }),
    update: (id, data) => axios({ method: 'PUT', url: `${basePath}/${id}`, data }),
    delete: (id, data) => axios({ method: 'DELETE', url: `${basePath}/${id}` })
  }
}
