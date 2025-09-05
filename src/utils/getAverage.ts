export const getAverage = (total: number, value: number): number => {
  if (total === 0) {
    return 0;
  }
  return parseFloat((value / total).toFixed(2));
};
