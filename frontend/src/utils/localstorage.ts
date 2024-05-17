export const getDataFromLocalStorage = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const setDataToLocalStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeDataFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const clearAll = () => {
  localStorage.clear();
};

export const isKeyInLocalStorage = (key: string) => {
  if (localStorage.getItem(key)) {
    return true;
  }
  return false;
};
