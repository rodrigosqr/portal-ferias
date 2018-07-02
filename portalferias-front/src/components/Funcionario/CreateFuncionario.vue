<template>
  <modal-registration
    ref="modalRegistration"
    :save="save"
    :title="'Funcionário'"
    :minHeight="'50vh'"
    :minWidth="'95vw'">

    <div class="row funcionario-form">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          v-model="entidade.nome"
          :float-label="'Nome'"
          name="nome"
          maxlength="60"
          v-validate="'required'"
          :error="errors.has('nome')"
          type="text"
          class="full-width form"/>
      </div>

      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          v-model="entidade.cpf"
          v-pattern="'cpf'"
          :float-label="'CPF'"
          name="cpf"
          maxlength="14"
          v-validate="'required'"
          :error="errors.has('cpf')"
          type="text"
          class="full-width form"/>
      </div>

      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-datetime
          v-model="entidade.dataNascimento"
          :float-label="'Data de Nascimento'"
          name="dataNascimento"
          v-validate="'required'"
          :error="errors.has('dataNascimento')"
          type="date"
          format="DD/MM/YYYY"
          class="full-width form"/>
      </div>

      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-datetime
          v-model="entidade.dataAdmissao"
          :float-label="'Data de Admissão'"
          name="dataAdmissao"
          v-validate="'required'"
          :error="errors.has('dataAdmissao')"
          type="date"
          format="DD/MM/YYYY"
          class="full-width form"/>
      </div>

      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          v-model="entidade.rg"
          :float-label="'RG'"
          name="rg"
          v-validate="'required'"
          :error="errors.has('rg')"
          maxlength="10"
          type="text"
          class="full-width form"/>
      </div>

      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          v-if="entidade.cargo"
          v-model="entidade.cargo.id"
          :options="getCargos"
          radio
          :float-label="'Cargo'"
          name="cargo"
          v-validate="'required'"
          :error="errors.has('cargo')"
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
      resources: this.$api.funcionario(this.$axios),
      subObjects: {
        cargo: {}
      },
      cargos: []
    }
  },
  methods: {
    findCargos () {
      this.$api.cargo(this.$axios).findAll()
        .then(response => {
          this.cargos = response.data
          this.cargos.unshift({ id: null, descricao: '' })
        })
        .catch(() => {
          this.message.error('Não foi possível carregar os cargos.')
        })
    }
  },
  computed: {
    getCargos () {
      return this.cargos.map(el => {
        return { label: el.descricao, value: el.id }
      })
    }
  },
  created () {
    this.findCargos()
  }
}
</script>
<style scoped>
  .funcionario-form > div {
    padding-right: 8px;
  }

</style>
