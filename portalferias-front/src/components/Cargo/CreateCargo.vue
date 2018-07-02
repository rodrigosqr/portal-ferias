<template>
  <modal-registration
    ref="modalRegistration"
    :save="save"
    :title="'Cargo'"
    :minHeight="'30vh'"
    :minWidth="'70vw'">
    <q-input
      v-model="entidade.descricao"
      :float-label="'Descricao'"
      name="descricao"
      v-validate="'required'"
      :error="errors.has('descricao')"
      maxlength="100"
      type="text"
      class="full-width"/>
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
      resources: this.$api.cargo(this.$axios)
    }
  }
}
</script>
