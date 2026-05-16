export const getPercentage = (
  total: number,
  value: number,
  fixed: number = 2,
): number => {
  if (total === 0) {
    return 0;
  }
  return parseFloat(((value / total) * 100).toFixed(fixed));
};
