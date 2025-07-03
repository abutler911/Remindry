export const getThemeValue = (path, theme) => {
  return path.split(".").reduce((obj, key) => obj?.[key], theme);
};
