export const truncateText = (text: string, length: number = 50): string => {
  return text.length > length ? text.slice(0, length) + '…' : text;
};
