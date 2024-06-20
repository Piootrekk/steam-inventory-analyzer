export const setPascalCase = (str: string) => {
  return str
    .split(" ")
    .map((word) =>
      word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : ""
    )
    .join(" ");
};

export const setUrlDecoded = (str: string) => {
  return decodeURIComponent(str);
};

export const setUrlEncoded = (str: string) => {
  return encodeURIComponent(str);
};

export const camelCaseToWords = (str: string) => {
  return str
    .replace(/([A-Z])/g, " $1")
    .split(" ")
    .map((word) =>
      word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : ""
    )
    .join(" ")
    .trim();
};

export const parserToFloat = (str: string) => {
  return +parseFloat(str).toFixed(2);
};
