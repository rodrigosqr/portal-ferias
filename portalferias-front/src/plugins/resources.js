import cargo from 'common/resources/cargo'
import evento from 'common/resources/evento'
import funcionario from 'common/resources/funcionario'
import funcionarioEvento from 'common/resources/funcionario-evento'

export default ({ Vue }) => {
  Vue.prototype.$api = {
    cargo,
    evento,
    funcionario,
    funcionarioEvento
  }
}
