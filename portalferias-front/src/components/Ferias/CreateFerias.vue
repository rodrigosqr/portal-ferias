<template>
  <modal-registration
    ref="modalRegistration"
    :save="save"
    :title="'Funcionário'"
    :minHeight="'50vh'"
    :minWidth="'95vw'">

    <div class="row ferias-form">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <q-select
          v-if="entidade.funcionario"
          v-model="entidade.funcionario.id"
          :disable="edit"
          :options="getFuncionarios"
          radio
          :float-label="'Funcionário'"
          name="funcionario"
          v-validate="'required'"
          :error="errors.has('funcionario')"
          class="full-width form"/>
      </div>

      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-datetime
          v-model="entidade.dataInicioAquisicao"
          :float-label="'Data inicial da aquisição'"
          name="dataInicioAquisicao"
          v-validate="'required'"
          :error="errors.has('dataInicioAquisicao')"
          type="date"
          format="DD/MM/YYYY"
          class="full-width form"/>
      </div>

      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-datetime
          v-model="entidade.dataFinalAquisicao"
          :float-label="'Data final da aquisição'"
          name="dataFinalAquisicao"
          v-validate="'required'"
          :error="errors.has('dataFinalAquisicao')"
          type="date"
          format="DD/MM/YYYY"
          class="full-width form"/>
      </div>
    </div>
  </modal-registration>
</template>
<script>
import ModalRegistration from 'components/ModalRegistration'
import registrationMixin from 'common/mixins/registration.js'
import { QDatetime } from 'quasar'

export default {
  components: {
    ModalRegistration,
    QDatetime
  },
  mixins: [registrationMixin],
  data () {
    return {
      resources: this.$api.ferias(this.$axios),
      subObjects: {
        funcionario: {}
      },
      funcionarios: []
    }
  },
  methods: {
    findFuncionarios () {
      this.$api.funcionario(this.$axios).findAll()
        .then(response => {
          this.funcionarios = response.data
          this.funcionarios.unshift({ id: null, descricao: '' })
        })
        .catch(() => {
          this.message.error('Não foi possível carregar os funcionários.')
        })
    },
    othersValidations () {
      if (this.entidade.dataInicioEvento > this.entidade.dataFinalEvento) {
        this.message.warning('A data inicial não pode ser maior que a data final.')
        return false
      }
      return true
    }
  },
  computed: {
    getFuncionarios () {
      return this.funcionarios.map(el => {
        return { label: el.nome, value: el.id }
      })
    }
  },
  created () {
    this.findFuncionarios()
  }
}
</script>
<style scoped>
  .ferias-form > div {
    padding-right: 8px;
  }

</style>
