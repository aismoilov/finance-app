import dayjs from 'dayjs';

export const formatDate = (date: string | Date, format = 'DD.MM.YYYY'): string => {
  return dayjs(date).format(format);
};

export const formatCurrency = (amount: number): string => {
  return `${amount.toFixed(2)} ₽`;
};
