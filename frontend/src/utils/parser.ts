export const parserToObject = <T>(str: string): T => {
  try {
    const obj = JSON.parse(str) as T;

    if (!obj) {
      throw new Error("Invalid JSON format");
    }

    return obj;
  } catch (error) {
    throw new Error("Invalid JSON format");
  }
};
