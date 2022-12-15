

const formatNumber = (num: number) => {
  return ('0' + num).slice(-2);
};
export const dateToString = (date: Date) => {
  return `${formatNumber(date.getDate())}.${date.getFullYear()}`;
};
