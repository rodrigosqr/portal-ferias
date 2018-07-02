import {
  QSpinnerHourglass
} from 'quasar'

export default {
  methods: {
    showLoading () {
      this.$q.loading.show({
        spinner: QSpinnerHourglass,
        message: this.$i18n.t('general.wait'),
        spinnerSize: 250
      })
    },
    hideLoading () {
      this.$q.loading.hide()
    }
  }
}
