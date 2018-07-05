<template>
  <div>
    <div class="flex justify-end portalferias-btn">
      <q-btn
        color="primary"
        @click="newGozoFerias"
        label="Novo" />
      <q-btn
        :disable="!oneSelected"
        color="positive"
        @click="editGozoFerias"
        label="Editar" />
      <q-btn
        :disable="!manySelected"
        color="negative"
        @click="deleteGozoFerias"
        label="Excluir" />
    </div>

    <list-gozo-ferias
      ref="list"
      :selected="selected"/>
    <create-gozo-ferias
      ref="modal"
      @reload="reload"/>
  </div>
</template>
<script>
import CreateGozoFerias from 'components/GozoFerias/CreateGozoFerias'
import ListGozoFerias from 'components/GozoFerias/ListGozoFerias'

export default {
  data () {
    return {
      selected: []
    }
  },

  components: {
    CreateGozoFerias,
    ListGozoFerias
  },

  methods: {
    newGozoFerias () {
      this.$refs.modal.addItem()
    },
    editGozoFerias () {
      if (this.oneSelected) {
        this.$refs.modal.editItem(this.selected[0])
      }
    },
    deleteGozoFerias () {
      if (this.manySelected) {
        this.$api.gozoFerias(this.$axios).delete(this.selected[0].id)
          .then(() => {
            this.message.success('Deletado com sucesso')
            this.reload()
          })
          .catch(() => {
            this.message.error('Erro ao deletar')
          })
      }
    },
    reload () {
      this.$refs.list.findGozoFerias()
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
