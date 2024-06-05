export const parserToObject = <T>(str: string): T => {
  try {
    return JSON.parse(str) as T;
  } catch (error) {
    throw new Error("Invalid JSON format");
  }
};
