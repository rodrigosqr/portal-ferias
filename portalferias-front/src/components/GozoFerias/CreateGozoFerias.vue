<template>
  <modal-registration
    ref="modalRegistration"
    :save="save"
    :title="'Funcionário'"
    :minHeight="'50vh'"
    :minWidth="'95vw'">

    <div class="row ferias-form">
      <div class="col-md-7 col-sm-12 col-xs-12">
        <q-select
          v-if="entidade.ferias && entidade.ferias.funcionario"
          v-model="entidade.ferias.funcionario.id"
          :disable="edit"
          :options="getFuncionarios"
          radio
          :float-label="'Funcionário'"
          name="funcionario"
          v-validate="'required'"
          :error="errors.has('funcionario')"
          class="full-width form"/>
      </div>

      <div class="col-md-5 col-sm-12 col-xs-12">
        <q-select
          v-if="entidade.ferias"
          v-model="entidade.ferias.id"
          :disable="edit"
          :options="getFerias"
          radio
          :float-label="'Período Aquisitivo'"
          name="ferias"
          v-validate="'required'"
          :error="errors.has('ferias')"
          class="full-width form"/>
      </div>

      <div class="col-md-4 col-sm-12 col-xs-12">
        <q-datetime
          v-model="entidade.dataInicioGozo"
          :float-label="'Data inicial'"
          name="dataInicioGozo"
          v-validate="'required'"
          :error="errors.has('dataInicioGozo')"
          type="date"
          format="DD/MM/YYYY"
          class="full-width form"/>
      </div>

      <div class="col-md-4 col-sm-12 col-xs-12">
        <q-datetime
          v-model="entidade.dataFinalGozo"
          :float-label="'Data final'"
          name="dataFinalGozo"
          v-validate="'required'"
          :error="errors.has('dataFinalGozo')"
          type="date"
          format="DD/MM/YYYY"
          class="full-width form"/>
      </div>

      <div class="col-md-4 col-sm-12 col-xs-12">
        <q-datetime
          v-model="entidade.dataPagamentoFerias"
          :float-label="'Data de pagamento'"
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
import moment from 'moment'

export default {
  components: {
    ModalRegistration,
    QDatetime
  },
  mixins: [registrationMixin],
  data () {
    return {
      resources: this.$api.gozoFerias(this.$axios),
      subObjects: this.newEntity(),
      ferias: [],
      funcionarios: []
    }
  },
  methods: {
    newEntity () {
      return {
        ferias: {
          funcionario: {}
        }
      }
    },
    addItem () {
      this.edit = false
      this.entidade = this.newEntity()
      this.openModal()
    },
    findFerias (id) {
      this.$api.ferias(this.$axios).findByFuncionario(id)
        .then(response => {
          this.ferias = response.data
          this.ferias.unshift({ id: null, descricao: '' })
        })
        .catch(() => {
          this.message.error('Não foi possível carregar os períodos aquisitivos.')
        })
    },
    findFuncionarios () {
      this.$api.funcionario(this.$axios).findAll()
        .then(response => {
          this.funcionarios = response.data
          this.funcionarios.unshift({ id: null, descricao: '' })
        })
        .catch(() => {
          this.message.error('Não foi possível carregar funcionarios.')
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
    getFerias () {
      return this.ferias.map(el => {
        return {
          label: el.dataInicioAquisicao && el.dataFinalAquisicao
            ? `${moment(el.dataInicioAquisicao).format('DD/MM/YYYY')} - ${moment(el.dataFinalAquisicao).format('DD/MM/YYYY')}`
            : '',
          value: el.id
        }
      })
    },
    getFuncionarios () {
      return this.funcionarios.map(el => {
        return { label: el.nome, value: el.id }
      })
    }
  },
  watch: {
    'entidade.ferias.funcionario.id' (newValue) {
      if (newValue) {
        this.findFerias(newValue)
      }
    }
  },
  mounted () {
    this.findFuncionarios()
  }
}
</script>
<style scoped>
  .ferias-form > div {
    padding-right: 8px;
  }

</style>
