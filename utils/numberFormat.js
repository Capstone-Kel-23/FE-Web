export const currency = (value) => {
  return Intl.NumberFormat(
    'id-ID',
    {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }
  ).format(value)
}

export const number = (value) => {
  return Intl.NumberFormat().format(value)
}
