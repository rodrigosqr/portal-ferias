export const removePunctuation = (value) => {
  if (!value) {
    return value
  }

  return value.replace(/[^0-9\s]/gi, '')
}

export const CpfFormat = (value) => {
  return (value && value.length === 11)
    ? `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6, 9)}-${value.substring(9, 11)}`
    : ''
}
