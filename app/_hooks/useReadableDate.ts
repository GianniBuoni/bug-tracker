export const useReadableDate = (rawDate: string) => {
  const shownDate = new Date(rawDate).toDateString();
  const shownTime = new Date(rawDate).toLocaleTimeString();
  return shownDate + " " + shownTime;
};
