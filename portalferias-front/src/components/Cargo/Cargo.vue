<template>
  <div>
    <div class="flex justify-end portalferias-btn">
      <q-btn
        color="primary"
        @click="newCargo"
        label="Novo" />
      <q-btn
        :disable="!oneSelected"
        color="positive"
        @click="editCargo"
        label="Editar" />
      <q-btn
        :disable="!manySelected"
        color="negative"
        @click="deleteCargo"
        label="Excluir" />
    </div>

    <list-cargo
      ref="list"
      :selected="selected"/>
    <create-cargo
      ref="modal"
      @reload="reload"/>
  </div>
</template>
<script>
import CreateCargo from 'components/Cargo/CreateCargo'
import ListCargo from 'components/Cargo/ListCargo'
import LoadingMixin from 'common/mixins/loading.js'
import errorMixin from 'common/mixins/error'

export default {
  mixins: [LoadingMixin, errorMixin],
  data () {
    return {
      selected: []
    }
  },

  components: {
    CreateCargo,
    ListCargo
  },

  methods: {
    newCargo () {
      this.$refs.modal.addItem()
    },
    editCargo () {
      if (this.oneSelected) {
        this.$refs.modal.editItem(this.selected[0])
      }
    },
    deleteCargo () {
      if (this.manySelected) {
        this.showLoading()
        this.$api.cargo(this.$axios).delete(this.selected[0].id)
          .then(() => {
            this.message.success('Deletado com sucesso')
            this.reload()
          })
          .catch((error) => {
            this.treatError(error, ': Esse cargo está sendo usado')
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    reload () {
      this.$refs.list.findCargos()
    }
  },
  computed: {
    oneSelected () {
      return this.selected && this.selected.length === 1
    },
    manySelected () {
      return this.selected && this.selected.length > 0
    }
  }
}
</script>
<style>
  .portalferias-btn .q-btn {
    margin-left: 5px;
  }
</style>
