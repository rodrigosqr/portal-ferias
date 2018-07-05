export default {
  methods: {
    treatError (error, complement = '') {
      const errors = error.response.data
      if (errors && errors.constructor.name === 'Array') {
        errors.forEach(el => {
          let message = el.mensagemUsuario
          if (el.mensagemDesenvolvedor.indexOf('foreign key')) {
            message += complement
          }
          this.message.error(message)
        })
      } else {
        this.message.error('Operação inválida')
      }
    }
  }
}
