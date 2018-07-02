<template>
  <div>
    <div class="flex justify-end portalferias-btn">
      <q-btn
        color="primary"
        @click="newFuncionario"
        label="Novo" />
      <q-btn
        :disable="!oneSelected"
        color="positive"
        @click="editFuncionario"
        label="Editar" />
      <q-btn
        :disable="!manySelected"
        color="negative"
        @click="deleteFuncionario"
        label="Excluir" />
    </div>

    <list-funcionario
      ref="list"
      :selected="selected"/>
    <create-funcionario
      ref="modal"
      @reload="reload"/>
  </div>
</template>
<script>
import CreateFuncionario from 'components/Funcionario/CreateFuncionario'
import ListFuncionario from 'components/Funcionario/ListFuncionario'

export default {
  data () {
    return {
      selected: []
    }
  },

  components: {
    CreateFuncionario,
    ListFuncionario
  },

  methods: {
    newFuncionario () {
      this.$refs.modal.addItem()
    },
    editFuncionario () {
      if (this.oneSelected) {
        this.$refs.modal.editItem(this.selected[0])
      }
    },
    deleteFuncionario () {
      if (this.manySelected) {
        this.$api.funcionario(this.$axios).delete(this.selected[0].id)
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
      this.$refs.list.findFuncionarios()
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
