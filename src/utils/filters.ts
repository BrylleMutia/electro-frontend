export const numWithCommas = (price: number | string) => {
  return price.toLocaleString().replace(",", ", ");
}