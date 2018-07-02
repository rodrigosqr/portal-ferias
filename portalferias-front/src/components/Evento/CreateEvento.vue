<template>
  <modal-registration
    ref="modalRegistration"
    :save="save"
    :title="'Evento'"
    :minHeight="'40vh'"
    :minWidth="'70vw'">
    <div class="row evento-form">
      <div class="col-md-9 col-sm-12 col-xs-12">
        <q-input
          v-model="entidade.descricao"
          :float-label="'Descricao'"
          name="descricao"
          v-validate="'required'"
          :error="errors.has('descricao')"
          maxlength="100"
          type="text"
          class="full-width"/>
      </div>

      <div class="col-md-3 col-sm-12 col-xs-12">
        <q-select
          v-model="entidade.tipoEvento"
          :options="tiposEvento"
          radio
          :float-label="'Tipo evento'"
          name="tipoEvento"
          v-validate="'required'"
          :error="errors.has('tipoEvento')"
          class="full-width form"/>
      </div>
    </div>

  </modal-registration>
</template>
<script>
import ModalRegistration from 'components/ModalRegistration'
import registrationMixin from 'common/mixins/registration.js'

export default {
  components: {
    ModalRegistration
  },
  mixins: [registrationMixin],
  data () {
    return {
      resources: this.$api.evento(this.$axios),
      tiposEvento: [
        {
          label: 'Crédito',
          value: 'C'
        },
        {
          label: 'Débito',
          value: 'D'
        }
      ]
    }
  }
}
</script>
<style>
  .evento-form > div {
    padding-right: 8px;
  }
</style>
