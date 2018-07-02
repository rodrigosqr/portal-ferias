import vanillaMasker from 'vanilla-masker'

export const cpfCnpjFormat = (value) => {
  if (!value || value.length < 11) {
    return null
  }

  return value.length === 11
    ? vanillaMasker.toPattern(value, '999.999.999-99')
    : vanillaMasker.toPattern(value, '99.999.999/9999-99')
}
export const phoneFormat = (ddd, number) => {
  if (!ddd || !ddd.length || !number || (number.length !== 8 && number.length !== 9)) {
    return null
  }
  return `(${ddd}) ${number.substring(0, number.length - 4)}-${number.substring(number.length - 4, number.length)}`
}
