<template>
  <div>
    <div class="flex justify-end portalferias-btn">
      <q-btn
        color="primary"
        @click="newFuncionarioEvento"
        label="Novo" />
      <q-btn
        :disable="!oneSelected"
        color="positive"
        @click="editFuncionarioEvento"
        label="Editar" />
      <q-btn
        :disable="!manySelected"
        color="negative"
        @click="deleteFuncionarioEvento"
        label="Excluir" />
    </div>

    <list-funcionario-evento
      ref="list"
      :selected="selected"/>
    <create-funcionario-evento
      ref="modal"
      @reload="reload"/>
  </div>
</template>
<script>
import CreateFuncionarioEvento from 'components/FuncionarioEvento/CreateFuncionarioEvento'
import ListFuncionarioEvento from 'components/FuncionarioEvento/ListFuncionarioEvento'

export default {
  data () {
    return {
      selected: []
    }
  },

  components: {
    CreateFuncionarioEvento,
    ListFuncionarioEvento
  },

  methods: {
    newFuncionarioEvento () {
      this.$refs.modal.addItem()
    },
    editFuncionarioEvento () {
      if (this.oneSelected) {
        this.$refs.modal.editItem(this.selected[0])
      }
    },
    deleteFuncionarioEvento () {
      if (this.manySelected) {
        this.$api.funcionarioEvento(this.$axios).delete(this.selected[0].id)
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
      this.$refs.list.findFuncionariosEvento()
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
