export const setSessionStorage = (key, value) => {
  sessionStorage.setItem(key, value);
};

export const getSessionStorage = (key) => {
  return sessionStorage.getItem(key);
};
