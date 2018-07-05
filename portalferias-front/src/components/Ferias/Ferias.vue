<template>
  <div>
    <div class="flex justify-end portalferias-btn">
      <q-btn
        color="primary"
        @click="newFerias"
        label="Novo" />
      <q-btn
        :disable="!oneSelected"
        color="positive"
        @click="editFerias"
        label="Editar" />
      <q-btn
        :disable="!manySelected"
        color="negative"
        @click="deleteFerias"
        label="Excluir" />
    </div>

    <list-ferias
      ref="list"
      :selected="selected"/>
    <create-ferias
      ref="modal"
      @reload="reload"/>
  </div>
</template>
<script>
import CreateFerias from 'components/Ferias/CreateFerias'
import ListFerias from 'components/Ferias/ListFerias'
import errorMixin from 'common/mixins/error'

export default {
  mixins: [errorMixin],
  data () {
    return {
      selected: []
    }
  },

  components: {
    CreateFerias,
    ListFerias
  },

  methods: {
    newFerias () {
      this.$refs.modal.addItem()
    },
    editFerias () {
      if (this.oneSelected) {
        this.$refs.modal.editItem(this.selected[0])
      }
    },
    deleteFerias () {
      if (this.manySelected) {
        this.$api.ferias(this.$axios).delete(this.selected[0].id)
          .then(() => {
            this.message.success('Deletado com sucesso')
            this.reload()
          })
          .catch((error) => {
            this.treatError(error, ': Esse período aquisitivo está sendo usado')
          })
      }
    },
    reload () {
      this.$refs.list.findAllFerias()
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
