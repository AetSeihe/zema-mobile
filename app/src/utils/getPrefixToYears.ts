export const getPrefixToYears = (year: number) =>{
  const stringYear = year.toString();
  const lastNumber = stringYear[stringYear.length - 1];

  switch (lastNumber) {
    case '1':
    case '2':
    case '3':
    case '4':
      return 'года';
    default:
      return 'лет';
  }
};
