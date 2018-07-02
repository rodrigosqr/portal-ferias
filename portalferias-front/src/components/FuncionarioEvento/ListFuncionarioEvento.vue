<template>
  <data-table
    :columns="columns"
    :tableData="tableData"
    :selected="selected"/>
</template>
<script>
import DataTable from 'components/DataTable'
import moment from 'moment'

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
          name: 'nome',
          required: true,
          label: 'Funcionário',
          align: 'left',
          field: 'nome',
          sortable: true
        },
        {
          name: 'dataInicioEvento',
          required: true,
          label: 'Data inicial',
          align: 'left',
          field: 'dataInicioFormatado',
          sortable: true
        },
        {
          name: 'dataFinalEvento',
          required: true,
          label: 'Data final',
          align: 'left',
          field: 'dataFinalFormatado',
          sortable: true
        }
      ]
    }
  },
  methods: {
    findFuncionariosEvento () {
      this.$api.funcionarioEvento(this.$axios).findAll()
        .then(response => {
          response.data.forEach(el => {
            el.name = el.id
            el.nome = el.funcionario.nome
            el.dataInicioFormatado = moment(el.dataInicioEvento).format('DD/MM/YYYY')
            el.dataFinalFormatado = moment(el.dataFinalEvento).format('DD/MM/YYYY')
          })
          this.tableData = response.data
        })
        .catch(() => {
          this.message.error('Não foi possível carregar os registros.')
        })
    }
  },
  mounted () {
    this.findFuncionariosEvento()
  }
}
</script>
