import vanillaMasker from 'vanilla-masker'
import moment from 'moment'
import LoadingMixin from 'common/mixins/loading.js'
import errorMixin from 'common/mixins/error'
import { removePunctuation } from 'common/utils/regex-utils.js'

export default {
  mixins: [LoadingMixin, errorMixin],
  data () {
    return {
      entidade: {},
      edit: false
    }
  },
  methods: {
    addItem () {
      this.edit = false
      this.entidade = this.subObjects || {}
      this.openModal()
    },
    editItem (entidade) {
      this.edit = true
      this.entidade = this.formatFields(entidade)
      this.entidade.cpf = this.entidade.cpf
      delete this.entidade.name
      delete this.entidade.__index
      this.openModal()
    },
    openModal () {
      this.$validator.reset()
      if (this.tabsModel) {
        this.tabsModel = 'tab1'
      }
      this.$refs.modalRegistration.open()
    },
    closeModal () {
      this.$refs.modalRegistration.close()
    },
    validate () {
      return [
        this.$validator.validateAll(),
        this.othersValidations ? this.othersValidations() : true
      ]
    },
    save () {
      Promise.all(this.validate())
        .then(responses => {
          if (~responses.indexOf(false)) {
            if (!this.othersValidations) {
              this.message.warning('Existem dados que devem ser preenchidos')
            }
            return
          }

          if (this.entidade.id) {
            this.requestUpdate()
            return
          }
          this.requestSave()
        })
        .catch((error) => {
          this.message.error('Erro ao realizar operação')
          throw error
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    requestSave () {
      this.showLoading()
      const payload = this.resolvePayload()
      this.resources.save(payload)
        .then(() => {
          this.message.success('Salvo com sucesso.')
          this.closeModal()
          this.$emit('reload')
        })
        .catch((error) => {
          this.treatError(error)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    requestUpdate () {
      this.showLoading()
      const payload = this.resolvePayload()
      this.resources.update(payload.id, payload)
        .then(() => {
          this.message.success('Atualizado com sucesso.')
          this.closeModal()
          this.$emit('reload')
        })
        .catch((error) => {
          this.treatError(error)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    formatFields (entidade) {
      let obj = Object.assign({}, entidade)
      const chaves = Object.keys(obj)

      chaves.forEach(el => {
        const elToUpperCase = el.toUpperCase()

        if (obj[el]) {
          if (~elToUpperCase.indexOf('CPF')) {
            obj[el] = vanillaMasker.toPattern(obj[el], '999.999.999-99')
          }
        }
      })
      return obj
    },
    resolvePayload () {
      const payload = Object.assign({}, this.entidade)
      const chaves = Object.keys(payload)
      chaves.forEach(el => {
        if (payload[el]) {
          if (payload[el].constructor.name === 'Object' && !Object.keys(payload[el]).length) {
            payload[el] = undefined
          } else if (~el.toUpperCase().indexOf('DATA')) {
            payload[el] = moment(payload[el]).format('YYYY-MM-DD')
          } else if (~['cpf'].indexOf(el)) {
            payload[el] = removePunctuation(payload[el])
          }
        }
      })
      return payload
    }
  }
}
