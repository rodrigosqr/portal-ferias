import axios from 'axios'

export default ({ Vue }) => {
  // axios.interceptors.response.use(function (response) {
  //   let data = response.data
  //   if (data.constructor.name === 'Array') {
  //      data.forEach(element => {
  //        if (element.constructor.name === 'Object') {
  //          Object.assign(element).forEach(el => {

  //          })
  //        }
  //      })
  //   }
  //   return response
  // })

  Vue.prototype.$axios = axios
}
