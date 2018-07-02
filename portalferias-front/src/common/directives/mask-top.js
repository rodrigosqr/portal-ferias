import vanillaMasker from 'vanilla-masker'

const inBrowser = typeof window !== 'undefined'
const UA = inBrowser && window.navigator.userAgent.toLowerCase()
const isEdge = UA && UA.indexOf('edge/') > 0
const isAndroid = (UA && UA.indexOf('android') > 0)
const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge

const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}

const getChildrenNode = (el) => {
  return el.tagName === 'INPUT' ? el : el.querySelector('input')
}

const getMask = (mask) => {
  switch (mask) {
    case 'data':
      return '99/99/9999'
    case 'cpf':
      return '999.999.999-99'
    case 'cnpj':
      return '99.999.999/9999-99'
    case 'cep':
      return '99999-999'
    case 'telephone':
      return '(99) 9999-9999'
    case 'cell-phone':
      return '(99) 99999-9999'
    default:
      return null
  }
}

function updateValue (el, binding) {
  if (!binding.value) {
    throw Error(`[mask.js] this masks directive requires a value. the current value is: ${binding.value}`)
  }

  const { value } = el
  console.log('value', value)
  if (value) {
    const mask = getMask(binding.value)
    if (mask) {
      el.value = vanillaMasker.toPattern(value, mask)
    } else {
      if (binding.value === 'money') {
        vanillaMasker(el).maskMoney()
      } else if (binding.value === 'decimalprecision4') {
        vanillaMasker(el).maskMoney({
          precision: 4
        })
      } else if (binding.value === 'number') {
        vanillaMasker(el).maskNumber()
      } else {
        vanillaMasker(el).maskPattern(binding.value)
      }
    }

    if (isAndroid && isChrome) {
      setTimeout(() => trigger(el, 'input'), 0)
    } else {
      trigger(el, 'input')
    }
  }

  el.dataset.previousValue = value
}

export const vPattern = {
  bind (el, binding) {
    let elementInput = getChildrenNode(el)
    // vanillaMasker(elementInput).unMask()
    updateValue(elementInput, binding)
  },
  componentUpdated (el, binding) {
    let elementInput = getChildrenNode(el)
    // vanillaMasker(elementInput).unMask()
    updateValue(elementInput, binding)
  }
}
