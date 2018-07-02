<template>
  <data-table
    :columns="columns"
    :tableData="tableData"
    :selected="selected"/>
</template>
<script>
import DataTable from 'components/DataTable'

export default {
  props: {
    selected: {
      type: Array,
      default () { return [] }
    }
  },
  components: {
    DataTable
  },
  data () {
    return {
      tableData: [],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Descrição',
          align: 'left',
          field: 'name',
          sortable: true
        }
      ]
    }
  },
  methods: {
    findFuncionarios () {
      this.$api.funcionario(this.$axios).findAll()
        .then(response => {
          response.data.forEach(el => {
            el.name = el.nome
          })
          this.tableData = response.data
        })
        .catch(() => {
          this.message.error('Não foi possível carregar os registros.')
        })
    }
  },
  mounted () {
    this.findFuncionarios()
  }
}
</script>
