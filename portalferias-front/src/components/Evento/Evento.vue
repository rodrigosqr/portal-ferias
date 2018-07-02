<template>
  <div>
    <div class="flex justify-end portalferias-btn">
      <q-btn
        color="primary"
        @click="newEvento"
        label="Novo" />
      <q-btn
        :disable="!oneSelected"
        color="positive"
        @click="editEvento"
        label="Editar" />
      <q-btn
        :disable="!manySelected"
        color="negative"
        @click="deleteEvento"
        label="Excluir" />
    </div>

    <list-evento
      ref="list"
      :selected="selected"/>
    <create-evento
      ref="modal"
      @reload="reload"/>
  </div>
</template>
<script>
import CreateEvento from 'components/evento/CreateEvento'
import ListEvento from 'components/evento/ListEvento'
import LoadingMixin from 'common/mixins/loading.js'

export default {
  mixins: [LoadingMixin],
  data () {
    return {
      selected: []
    }
  },

  components: {
    CreateEvento,
    ListEvento
  },

  methods: {
    newEvento () {
      this.$refs.modal.addItem()
    },
    editEvento () {
      if (this.oneSelected) {
        this.$refs.modal.editItem(this.selected[0])
      }
    },
    deleteEvento () {
      if (this.manySelected) {
        this.showLoading()
        this.$api.evento(this.$axios).delete(this.selected[0].id)
          .then(() => {
            this.message.success('Deletado com sucesso')
            this.reload()
          })
          .catch(() => {
            this.message.error('Erro ao deletar')
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    reload () {
      this.$refs.list.findEventos()
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
