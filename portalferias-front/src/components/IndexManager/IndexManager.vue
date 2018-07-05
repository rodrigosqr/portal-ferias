<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Portal de Férias
        </q-toolbar-title>

      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-item v-for="(menu, key) in menus"
          :key="key"
          :to="menu.url">
          <q-item-side icon="navigate next" />
          <q-item-main :label="menu.label" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import LoadingMixin from 'common/mixins/loading.js'

import {
  QTooltip
} from 'quasar'

export default {
  mixins: [LoadingMixin],
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      menus: [
        { label: 'Cargo', url: '/cargo' },
        { label: 'Evento', url: '/evento' },
        { label: 'Funcionário', url: '/funcionario' },
        { label: 'Eventos do Funcionário', url: '/funcionarioevento' },
        { label: 'Férias do Funcionário', url: '/ferias' },
        { label: 'Gozo de férias do Funcionário', url: '/gozoferias' }
      ]
    }
  },
  components: {
    QTooltip
  }
}
</script>

<style>
  .portalferias-btn {
    padding: 10px;
  }
</style>
