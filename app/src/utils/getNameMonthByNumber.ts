

export const getNameDayByNumber = (day: number): string => {
  switch (day) {
    case 1: return 'Понедельник';
    case 2: return 'Вторник';
    case 3: return 'Среда';
    case 4: return 'Четверг';
    case 5: return 'Пятница';
    case 6: return 'Суббота';
    case 7: return 'Воскресенье';
    default: return '';
  }
};

export const getNameMonthByNumber = (month: number): string => {
  switch (month) {
    case 0: return 'Январь';
    case 1: return 'Февраль';
    case 2: return 'Март';
    case 3: return 'Апрель';
    case 4: return 'Май';
    case 5: return 'Июнь';
    case 6: return 'Июль';
    case 7: return 'Август';
    case 8: return 'Сентябрь';
    case 9: return 'Октябрь';
    case 10: return 'Ноябрь';
    case 11: return 'Декабрь';
    default: return '';
  }
};

