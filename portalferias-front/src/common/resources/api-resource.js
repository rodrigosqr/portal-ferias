export const env = process.env.NODE_ENV
import { url } from './api-resource-env'

export const nonProdEnvStr = [
  'development',
  'homolog',
  'testing'
]

export const resourceTable = {
  default: {
    dev: 'http://localhost:8081/',
    prod: url
  }
}

export default (type, api = '') => {
  if (!type) {
    throw Error('[api-resource] Error! type is not defined.')
  }

  if (!resourceTable.hasOwnProperty(type)) {
    throw Error('[api-resource] Error! type is defined BUT it was not found on resourceTable.')
  }

  const auxEnv = nonProdEnvStr.indexOf(env) !== -1
    ? 'dev'
    : 'prod'

  return `${(resourceTable[type])[auxEnv]}${api}`
}
