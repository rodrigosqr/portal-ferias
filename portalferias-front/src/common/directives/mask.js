import vanillaMasker from 'vanilla-masker'

const getChildrenNode = (el) => {
  return el.tagName === 'INPUT' ? el : el.querySelector('input')
}

const includeMask = (el, mask) => {
  switch (mask) {
    case 'data':
      vanillaMasker(el).maskPattern('99/99/9999')
      break
    case 'cpf':
      vanillaMasker(el).maskPattern('999.999.999-99')
      break
    case 'cnpj':
      vanillaMasker(el).maskPattern('99.999.999/9999-99')
      break
    case 'cep':
      vanillaMasker(el).maskPattern('99999-999')
      break
    case 'telephone':
      vanillaMasker(el).maskPattern('(99) 9999-9999')
      break
    case 'cell-phone':
      vanillaMasker(el).maskPattern('(99) 99999-9999')
      break
    case 'money':
      vanillaMasker(el).maskMoney()
      break
    case 'decimalprecision4':
      vanillaMasker(el).maskMoney({ precision: 4 })
      break
    case 'number':
      vanillaMasker(el).maskNumber()
      break
    default:
      vanillaMasker(el).maskPattern(mask)
      break
  }
}

function updateValue (el, binding) {
  if (!binding.value) {
    throw Error(`[mask.js] this masks directive requires a value. the current value is: ${binding.value}`)
  }

  includeMask(el, binding.value)
}

export const vPattern = {
  bind (el, binding) {
    updateValue(getChildrenNode(el), binding)
  },
  componentUpdated (el, binding) {
    let elementInput = getChildrenNode(el)
    vanillaMasker(elementInput).unMask()
    updateValue(elementInput, binding)
  }
}
