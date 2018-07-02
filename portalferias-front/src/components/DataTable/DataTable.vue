<template>
    <q-table
      :data="tableData"
      :columns="columns"
      :selection="selection"
      :selected.sync="selectedTable"
      :filter="filter"
      :visible-columns="visibleColumns"
      :separator="separator"
      row-key="name"
      :selected-rows-label="selectedRowsLabel"
      :paginationLabel="paginationLabel"
      color="secondary"
      title
      :no-data-label="$i18n.t('dataTable.noDataLabel')"
      :rows-per-page-label="$i18n.t('dataTable.rowsPerPageLabel')"
    >
      <template slot="top-left" slot-scope="props">
        <q-search
          hide-underline
          placeholder="Pesquise"
          color="secondary"
          v-model="filter"
          class="col-12"
        />
      </template>
      <template slot="top-right" slot-scope="props">
      <!--<q-table-columns
          color="secondary"
          class="q-mr-sm"
          v-model="visibleColumns"
          :columns="columns"
        />-->
        <!--<q-select
          color="secondary"
          v-model="separator"
          :options="[
            { label: 'Horizontal', value: 'horizontal' },
            { label: 'Vertical', value: 'vertical' },
            { label: 'Célula', value: 'cell' },
            { label: 'Nenhum', value: 'none' }
          ]"
          hide-underline
        />-->
        <q-btn
          v-if="isMobile"
          flat round dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
        />
      </template>
    </q-table>
</template>

<script>
import {
  QTable,
  QSearch,
  QTableColumns,
  QSelect
} from 'quasar'

// import tableData from 'assets/table-data'
export default {
  components: {
    QTable,
    QSearch,
    QTableColumns,
    QSelect
  },
  props: {
    columns: {
      type: Array,
      default () { return [] }
    },
    tableData: {
      type: Array,
      default () { return [] }
    },
    selected: {
      type: Array,
      default () { return [] }
    }
  },
  data () {
    return {
      filter: '',
      selectedTable: [],
      visibleColumns: [],
      separator: 'horizontal',
      selection: 'single'
    }
  },
  methods: {
    selectedRowsLabel (rowsNumber) {
      return `${rowsNumber} ${this.$i18n.t('dataTable.selectedRowsLabel')}`
    },
    paginationLabel (start, end, total) {
      return `${start} - ${end} de ${total}`
    }
  },
  computed: {
    isMobile () {
      return this.$q.platform.is.mobile
    }
  },
  watch: {
    selectedTable (newArray) {
      this.selected.splice(0, this.selected.length)
      this.selected.push(...newArray)
    },
    tableData () {
      this.selectedTable = []
    }
  }
}
</script>
