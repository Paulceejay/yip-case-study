export const parseDate = (dateStr: string) => {
  const [day, monthStr, year] = dateStr.split(' ');
  const months: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  return new Date(parseInt(year), months[monthStr], parseInt(day));
};
