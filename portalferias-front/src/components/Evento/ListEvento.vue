<template>
  <data-table
    :columns="columns"
    :tableData="tableData"
    :selected="selected"/>
</template>
<script>
import DataTable from 'components/DataTable'
import LoadingMixin from 'common/mixins/loading.js'

export default {
  mixins: [LoadingMixin],
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
    findEventos () {
      this.showLoading()
      this.$api.evento(this.$axios).findAll()
        .then(response => {
          response.data.forEach(el => {
            el.name = el.descricao
          })
          this.tableData = response.data
        })
        .catch(() => {
          this.message.error('Não foi possível carregar os registros.')
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  mounted () {
    this.findEventos()
  }
}
</script>
