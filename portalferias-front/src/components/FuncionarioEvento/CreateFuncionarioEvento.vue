<template>
  <modal-registration
    ref="modalRegistration"
    :save="save"
    :title="'Funcionário'"
    :minHeight="'50vh'"
    :minWidth="'95vw'">

    <div class="row funcionario-evento-form">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          v-if="entidade.funcionario"
          v-model="entidade.funcionario.id"
          :options="getFuncionarios"
          radio
          :float-label="'Funcionário'"
          name="funcionario"
          v-validate="'required'"
          :error="errors.has('funcionario')"
          class="full-width form"/>
      </div>

      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          v-if="entidade.evento"
          v-model="entidade.evento.id"
          :options="getEventos"
          radio
          :float-label="'Evento'"
          name="evento"
          v-validate="'required'"
          :error="errors.has('evento')"
          class="full-width form"/>
      </div>

      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-datetime
          v-model="entidade.dataInicioEvento"
          :float-label="'Data inicial'"
          name="dataInicioEvento"
          v-validate="'required'"
          :error="errors.has('dataInicioEvento')"
          type="date"
          format="DD/MM/YYYY"
          class="full-width form"/>
      </div>

      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-datetime
          v-model="entidade.dataFinalEvento"
          :float-label="'Data final'"
          name="dataFinalEvento"
          v-validate="'required'"
          :error="errors.has('dataFinalEvento')"
          type="date"
          format="DD/MM/YYYY"
          class="full-width form"/>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12">
        <q-input
          v-model="entidade.observacao"
          :float-label="'Observação'"
          maxlength="400"
          type="textarea"
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
      resources: this.$api.funcionarioEvento(this.$axios),
      subObjects: {
        evento: {},
        funcionario: {}
      },
      funcionarios: [],
      eventos: []
    }
  },
  methods: {
    findEventos () {
      this.$api.evento(this.$axios).findAll()
        .then(response => {
          this.eventos = response.data
          this.eventos.unshift({ id: null, descricao: '' })
        })
        .catch(() => {
          this.message.error('Não foi possível carregar os eventos.')
        })
    },
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
    getEventos () {
      return this.eventos.map(el => {
        return { label: el.descricao, value: el.id }
      })
    },
    getFuncionarios () {
      return this.funcionarios.map(el => {
        return { label: el.nome, value: el.id }
      })
    }
  },
  created () {
    this.findEventos()
    this.findFuncionarios()
  }
}
</script>
<style scoped>
  .funcionario-evento-form > div {
    padding-right: 8px;
  }

</style>
