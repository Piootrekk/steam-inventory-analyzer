export const setPascalCase = (str: string) => {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join("");
};

export const SetUrlDecoded = (str: string) => {
  return decodeURIComponent(str);
};

export const SetUrlEncoded = (str: string) => {
  return encodeURIComponent(str);
};

export const CamelCaseToWords = (str: string) => {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
};
