import {
  QModal,
  QModalLayout,
  QSearch
} from 'quasar'

export default {
  data () {
    return {
      layoutModal: false
    }
  },

  components: {
    QModal,
    QModalLayout,
    QSearch
  },

  methods: {
    show () {
      this.layoutModal = true
    },
    hide () {
      this.layoutModal = false
    }
  }
}
