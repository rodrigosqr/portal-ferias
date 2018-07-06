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
          name: 'aquisicao',
          required: true,
          label: 'Aquisição',
          align: 'left',
          field: 'aquisicao',
          sortable: true
        },
        {
          name: 'dataInicioFormatado',
          required: true,
          label: 'Data inicial',
          align: 'left',
          field: 'dataInicioFormatado',
          sortable: true
        },
        {
          name: 'dataFinalFormatado',
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
    findGozoFerias () {
      this.$api.gozoFerias(this.$axios).findAll()
        .then(response => {
          response.data.forEach(el => {
            el.name = el.id
            el.nome = el.ferias.funcionario.nome
            el.aquisicao = `${moment(el.ferias.dataInicioAquisicao).format('DD/MM/YYYY')} - ${moment(el.ferias.dataFinalAquisicao).format('DD/MM/YYYY')}`
            el.dataInicioFormatado = moment(el.dataInicioGozo).format('DD/MM/YYYY')
            el.dataFinalFormatado = moment(el.dataFinalGozo).format('DD/MM/YYYY')
            el.dataInicioGozo = moment(el.dataInicioGozo).toDate()
            el.dataFinalGozo = moment(el.dataFinalGozo).toDate()
            el.dataPagamentoFerias = moment(el.dataPagamentoFerias).toDate()
          })
          this.tableData = response.data
        })
        .catch(() => {
          this.message.error('Não foi possível carregar os registros.')
        })
    }
  },
  mounted () {
    this.findGozoFerias()
  }
}
</script>
