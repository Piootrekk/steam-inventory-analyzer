export const priceParser = (price: string): number => {
  return parseFloat(price.replace("$", "").replace(",", ".").replace("zł", ""));
};

export const removeThousandthSparator = (price: string): number => {
  return parseInt(price.replace(",", ""));
};
