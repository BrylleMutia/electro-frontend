export const numWithCommas = (price: number | string) => {
  return price.toLocaleString().replace(",", ", ");
}

export const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}