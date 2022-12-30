import {EmploymentType, WorkFormatType} from '../types/workTypes';

export const getNameByWorkFormatType = (item: WorkFormatType): string => {
  switch (item) {
    case 'office':
      return 'офис';
    case 'hybrid':
      return 'совмещенка';
    case 'remote':
      return 'удаленка';
  }

  return 'Не указан';
};

export const getNameByEmploymentType = (item: EmploymentType): string => {
  switch (item) {
    case 'fulltime':
      return 'весь день';
    case 'partTime':
      return 'частичная занятость';
  }

  return 'Не указан';
};
