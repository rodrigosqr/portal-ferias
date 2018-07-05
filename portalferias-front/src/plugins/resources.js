import cargo from 'common/resources/cargo'
import evento from 'common/resources/evento'
import funcionario from 'common/resources/funcionario'
import funcionarioEvento from 'common/resources/funcionario-evento'
import ferias from 'common/resources/ferias'
import gozoFerias from 'common/resources/gozo-ferias'

export default ({ Vue }) => {
  Vue.prototype.$api = {
    cargo,
    evento,
    funcionario,
    funcionarioEvento,
    ferias,
    gozoFerias
  }
}
