export const priceParser = (price: string): number => {
  if (price === undefined) {
    return 0;
  }
  return parseFloat(price.replace("$", "").replace(",", ".").replace("zł", ""));
};

export const removeThousandthSparator = (price: string): number => {
  if (price === undefined) {
    return 0;
  }
  return parseInt(price.replace(",", ""));
};
